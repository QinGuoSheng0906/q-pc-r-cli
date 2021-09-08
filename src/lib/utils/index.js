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

// antd 表单内容宽度 默认5,18
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

// a 标签打开新窗口
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

// // 滑滚动页面到顶部
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
 * ajax 并发请求，限制数量，防止内存溢出
 * 
**/ 


