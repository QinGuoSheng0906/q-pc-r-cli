/**
 *  工具函数
 */

// 判断数据类型                                                                                            
export const dataType = (target) => {      
    let type = Object.prototype.toString.call(target).slice(8, -1);
    let typeObj = {
        'Object': true,
        'Array': true,
        'Function': true,
        'RegExp': true,
        'Date': true,
        'Error': true,
        'Arguments': true,
        'Set': true,
        'Map': true,
        'Promise': true,
        'Symbol': true,
        'BigInt': true,
        'Math': true,
        'Null': true,
        'Undefined': true,
        'String': true,
        'Number': true,
        'Boolean': true
    };
    let val = {
        type
    };
    val['is' + type] = typeObj[type];
    if(type === 'String') {
        try {
            let obj = JSON.parse(target);
            val['isJSON'] = obj && typeof obj == 'object' ? true: false;
        }catch(e) {
            val['isJSON'] = false;
        }
    }
    return val;                                                                                          
}

// 金钱的保留两位小数，3位隔开  money 金额， point 保留几位
export const moneyFormat = (money, point) => {
    point = point > 0 && point <= 20 ? point : 2;
    let isNegative = false;
    if (money < 0) {
        money = Math.abs(money);
        isNegative = true;
    }
    money =
         parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(point) + '';
    let l = money
        .split('.')[0]
        .split('')
        .reverse();
    let r = money.split('.')[1];
    let result = '';
    for (let i = 0; i < l.length; i++) {
        result += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
    return (
        (isNegative ? '-' : '') +
         result
             .split('')
             .reverse()
             .join('') +
         '.' +
         r
    );
};

//  手机格式化 中间****号 isStar 是否星号替换 默认需要
export const phoneFormat = (phone, isStar = true) => {
    if(!phone) return ''
    phone += '' 
    if (isStar) {
        return `${phone.substring(0, 3)} ${'*'.repeat(phone.length - 7)
            .replace(/(.{4})/g, '$1 ')}${phone.length % 11 ? ' ' : ''}${phone.slice(-4)}`;
    } else {
        return phone.replace(/\s/g,'').replace(/(^\d{3})(?=\d)/g,'$1 ').replace(/(\d{4})(?=\d)/g,'$1 ');
    }
}
 
// 银行卡格式化 后四位显示 isStar 是否星号替换 默认需要
export const bankFormat = (bankNum, isStar = true) => {
    if(!bankNum) return ''
    bankNum += '';
    if (isStar) {
        return `${bankNum.substring(0, 4)} ${'*'.repeat(bankNum.length - 8)
            .replace(/(.{4})/g, '$1 ')}${bankNum.length % 4 ? ' ' : ''}${bankNum.slice(-4)}`;
    } else {
        bankNum = bankNum.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
        return bankNum
    }
}

// antd 表单内容宽度 默认6,18
export const layoutForm = (label = 6, wrapper = 18 ) => {
    return {
        labelCol: {
            span: label
        },
        wrapperCol: {
            span: wrapper
        }
    };
}

// a 标签打开新窗口 下载文件
export const aOpenWindow = (url) => {
    let newA = document.createElement('a');
    newA.id = 'new_a';
    newA.target = '_blank';
    newA.href = url;
    newA.rel = 'noopener noreferrer';
    document.body.appendChild(newA);
    newA.click();
    document.body.removeChild(newA);
}
/**
 * 多文件下载 使用iframe
 * @param ([{url: '', name: ''}], time = 5 * 60 * 1000) // 默认时间五分钟删除iframe
 * @returns 
**/
export const MultifileDownload = (fileData, time = 5 * 60 * 1000) => {
    if(!fileData || fileData.length < 1) return fileData;
    if(!dataType(time).isNumber || time < 1 ) return '请输入正确的时间！';
    let obj = {};
    fileData.forEach((item, index) => {
        if(item.url) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none'; // 防止影响页面
            iframe.style.height = 0; // 防止影响页面
            iframe.src = item.url; 
            document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
            // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
            obj[index + '_time'] = setTimeout(() => {
                obj[index + '_time'] = null;
                iframe.remove();
            }, time)
        }
    })
    
}

/**
 * 判断是否是URL
 * @param {*} data 
 * @returns  Boolean
 */
export const isUrl = (str) => {
    if(!dataType(str).isString || !str) return false;
    let v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
    return v.test(str);
}

// URL 参数序列化
export const paramSerialize  = (data) => {
    let str = '';
    for (let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&';
    }
    str = str.replace(/&$/, '');
    return str;
}

// URL 参数反序列化 解析为对象
export const paramDeserialization  = (url) => {
    let string = url.split('&');
    let res = {};
    for(let i = 0;i<string.length;i++){
        let str = string[i].split('=');
        if(str[0]!=''){
            res[str[0]]=str[1];
        }
    }
    return res;
}

//  base64 编码
export const encodeBase64 = (str) => {
    if(!str) return str;
    return window.btoa(unescape(encodeURIComponent( str )));
}
// base64 解码
export const decodeBase64 = (str) => {
    if(!str) return str;
    return decodeURIComponent(escape(window.atob( str )));
}

// html 代码 转义  <div>3>5 & 666</div> &lt;div&gt;3&gt;5 &amp; 666&lt;/div&gt;
export const encodeHtml = (s) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    let result = div.innerHTML;
    div = null;
    return result;
}
// html 代码 解析
export const decodeHtml = (s) => {
    let div = document.createElement('div');
    div.innerHTML = s;
    let result = div.innerText || div.textContent;
    div = null;
    return result;
}

/**
 *  替换特殊字符串, 进行转义
*/

/**
 *  替换特殊字符串, 进行解义
*/
export function replaceSpecialStr (data) {
    if(!data) return;
    // 需要特殊处理的字符或编码
    let specialStr =  {
        '&#34;': '"',
        '&#39;': '\'',
        '&#60;': '<',
        '&#62;': '>',
        '&quot;': '"',
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&'
    };
    // 类型
    const type = dataType(data); 
    let result = (str) => {
        if(!str) return str;
        let reg = /&#34;|&#39;|&#60;|&#62;|&quot;|&#39;|&lt;|&gt;|&amp;/g;
        let newStr = str.replace(reg, function (matchStr) {
            return specialStr[matchStr];
        });
        return newStr;
    }; 
    // 递归
    let recursive = (data) => {
        for(let i in data) {
            if(dataType(data[i]).isArray || dataType(data[i]).isObject) {
                recursive(data[i]);
            }
            if(dataType(data[i]).isString) {
                data[i] = result(data[i]);
            }
        }
        return data;
    };
    if(type.isArray || type.isObject ) {
        return recursive(data);
    }
    if(type.isString) {
        return result(data);
    }
    return data;
}

// 滑滚动页面到顶部
export const scrollToTop = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
}

// 深拷贝
export const deepClone = (data) => {
    if(!dataType(data).isObject || !dataType(data).isArray) return data;
    const type = dataType(data);
    let result  = type.isObject ? {} : [];
    // 遍历数据
    for (let i in data) {
        //获取遍历数据结构的每一项值。
        let value = data[i];
        //判断目标结构里的每一值是否存在对象/数组
        if (dataType(value).isObject || dataType(value).isArray) { //对象/数组里嵌套了对象/数组
            //继续遍历获取到value值
            result[i] = deepClone(value);
        } else { //获取到value值是基本的数据类型或者是函数。
            result[i] = value; 
        }
    }  
    return result;
}

/**
 * 防抖函数(可用于防止重复提交)
 * 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
 * 如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，
 * 且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param immediate 立即执行
 */
export const debounce = (fn, wait = 300, immediate) => {
    let timer;
    return function () {
        timer ? clearTimeout(timer) : '';
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) {
                fn.apply(this, arguments)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}

/**
 * 节流函数
 * 当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发
 * 小于既定值，函数节流会每隔这个时间调用一次
 * 用一句话总结防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行
 * 实现函数节流我们主要有两种方法：时间戳和定时器
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param options 立即执行
 * options中  leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
 */
export const throttle = (fn, wait=300 , options = {}) => {
    let timer;
    let previous = 0;
    return function () {
        let now = +new Date();
        // remaining 不触发下一次函数的剩余时间
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        if (remaining < 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(this, arguments)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                previous = options.leading === false ? 0 : new Date().getTime();
                timer = null;
                fn.apply(this, arguments);
            }, remaining);
        }
    }
}


/**
 *  中文按照字母顺序排序
 *  
**/ 
export const letterSort = (data) => {
    if(!data) return;
    let result = [];
    result = data.sort((item1, item2) => item1.localeCompare(item2));
    return result;
}
/**
 *  中文按照字母顺序 分类排序 
**/ 

export const letterCategorySort = (data, key) => {
    if(!dataType(data).isArray) return data;
    const letters = [ 'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'J', 'K', 'L', 'M','N', 'O', 'P','Q', 'R',  'S', 'T',   'W',  'X', 'Y',  'Z' ];
    const zh =  [ '阿','八','嚓','哒','妸','发','旮','哈','讥','咔','垃','痳','拏','噢','妑','七','呥', '扨', '它', '穵', '夕', '丫', '帀' ];
    let segs = [];
    let vieLetters = [];
    letters.forEach((x, i) => {
        let curr = { letter: x, data:[] };
        data.forEach((y) => {
            let item = key ? y[key] : y;
            if( item.localeCompare(zh[i]) >= 0 && item.localeCompare(zh[ i+1 ])<0 ) {
                curr.data.push(y)
            }
        })
        if(curr.data.length) {
            curr.data.sort((a,b) => {
                if(key) {
                    return a[key].localeCompare(b[key])
                } else  {
                    return a.localeCompare(b)
                }
            })
            segs.push(curr);
            vieLetters.push(curr.letter)
        }
    })
    return  {
        letters: vieLetters, 
        data: segs
    }
}

/** 
 *  去重并排序
*/
export const deWeightSort = (data, isSort = true, key ) => {
    if(!dataType(data).isArray || data.length < 1) return data;
    let obj={};
    let newArr=[];
    for(let i=0;i<data.length;i++){
        let item = key ? data[i][key] : data[i]
        if(!obj[item]){
            obj[item]=true;
            newArr.push(data[i]);
        }
    }
    isSort ? 
        newArr.sort((a,b) => key ? a[key] - b[key] : a - b) 
        : 
        null
    return newArr;
}


/** 
 * 数组降维
 * @param array 数组 
 * @param count 降维层级 类型 number 默认降维所有层级到一维
*/
export const arrayFlat = (array, count) => {
    if(!dataType(array).isArray || array.length < 1) return array;
    if(count) {
        if(!dataType(count).isNumber) return '参数count，不是Number！';
        if(count < 1) return '参数count，必须大于等于1！';
    }
    let newArray = [];
    let num = -1;
    let flatFunc = (data) => {
        if(count) {
            num++;
        }
        data.forEach(item => {
            if(dataType(item).isArray && item.length){
                if(count) {
                    num <= count + 1 ?
                        flatFunc(item)
                        :
                        newArray.push(item)
                } else {
                    flatFunc(item) 
                }
            } else {
                newArray.push(item)
            }
        })
    }
    flatFunc (array);
    return newArray;
}


/**
 *  对象 {'1':'值一'} 转为 数组对象 [{title: '值一', value: '1'}]
*
 */
export const objEnumArray = (obj) => {
    if(!dataType(obj).isObject) return obj;
    let newArry = [];
    Object.keys(obj).forEach(item => {
        newArry.push({
            title: obj[item],
            value: item
        })
    })
    return newArry;
}





