/*
*   中文按字母顺序 下拉排序
*/
import React, { Component } from 'react'
import  PropTypes from 'prop-types'

import  { Select, Row, Col } from 'antd'

import { CheckOutlined  } from '@ant-design/icons'



const letters = [ 'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'J', 'K', 'L', 'M','N', 'O', 'P','Q', 'R',  'S', 'T',   'W',  'X', 'Y',  'Z' ];
const zh =      [ '阿','八','嚓','哒','妸','发','旮','哈','讥','咔','垃','痳','拏','噢','妑','七','呥', '扨', '它', '穵', '夕', '丫', '帀' ];

const datas = [
    { lable: '张三', value: '1' }, { lable: '李四', value: '2' }, { lable: '王并', value: '3' }, { lable: '李明化', value: '13' }, { lable: '赵小冷', value: '14' },
    { lable: '嗄子', value: '4' }, { lable: '阿一', value: '5' }, { lable: '李飞', value: '6' }, { lable: '啊啊米', value: '15' }, { lable: '阿哥三', value: '16' },
    { lable: '赵小俞', value: '7' }, { lable: '宇文成都', value: '8' }, { lable: '玩玩乐', value: '9' }, { lable: '李明义', value: '17' }, { lable: '李明川', value: '18' },
    { lable: '董卓', value: '10' }
];
class SelectLetterSort extends Component {
    state = {
        open: false,
        autoFocus: false,
        vieLetters: [],
        lists: [],
        value: ''
    }

    componentDidMount () {
        this.setState({
            lists: this.strSort(datas, 'lable')
        })
    }
    // 中文拼音排序
    strSort = (data, key) => {
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
        this.setState({
            vieLetters
        })
        return segs;
    }
    // 自定义下拉菜单的内容
    dropdownRender = () => {
        let { listheight, mode } = this.props;
        let { lists, vieLetters } = this.state;
        return (
            <>
                <div className = 'list-select-content' onScroll = { this.onScroll }
                    style = { { height: listheight + 'px' } }
                >
                    <div className = 'select-content'>
                        {
                            lists.map ((x, indexX) => {
                                return (
                                    <div key = { indexX + '-' + x } className = 'list-group'>
                                        <div className = { 'letter-' + x.letter + ' list-group-name' }>{  x.letter  }</div>
                                        <div className = 'list-group-item'>
                                            {
                                                x.data.map((y, indexY) => {
                                                    return (
                                                        <Row 
                                                            key = { indexX + '-' + indexY } 
                                                            onClick = { () => this.onSelect( y, indexX, indexY ) }
                                                            value = { y.value }
                                                            className = { 
                                                                mode == 'multiple' ? 
                                                                    y.active ?  
                                                                        'list-option-multiple-active list-option'
                                                                        : 
                                                                        'list-option'
                                                                    :
                                                                    y.active ? 
                                                                        'list-option-active list-option' 
                                                                        : 
                                                                        'list-option'
                                                            }

                                                        >
                                                            <Col span = {  mode == 'multiple' ?  16 : 24 }> { y.lable }</Col> 
                                                            {
                                                                y.active && mode == 'multiple' ? 
                                                                    <Col span = { 8 } className = 't-r'> 
                                                                        <CheckOutlined 
                                                                            style = { { color: '#1890ff' } }
                                                                        />
                                                                    </Col> 
                                                                    : ''
                                                            }
                                                            
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className = 'letter-container'
                    onClick = { (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    } }
                >
                    <div className = 'letter-main-content'>
                        {
                            vieLetters.map((item) => {
                                // letters.map((item) => {
                                return  <div onClick = { () => this.letterOnClick(item) } key = { item } className = 'letter-item'>{ item }</div>
                           
                            })
                        }
                    </div>
                  
                </div>
            </>
        )
    }
    // 获取焦点
    onFocus = () => {
        this.setState({
            open: true,
            autoFocus: true
        })
    }
    // 失去焦点
    onBlur = () => {
        console.log('11111111111')
        this.setState({
            open: false,
            autoFocus: false
        })
    }
    onMouseDown = (e) =>  {
        e.preventDefault();
        this.setState({
            open: true,
            autoFocus: true
        })
    }
    // 下拉菜单滚动
    onScroll = (e) => {
        let { vieLetters } = this.state;
        if(vieLetters.length > 10) {
            let letter = document.getElementsByClassName('letter-container' )[0];
            letter ? 
                letter.scrollTop = e.target.scrollTop
                : null
        }
    }
    // 滚动到指定位置
    letterOnClick = (target) => {
        let letter = document.getElementsByClassName( 'letter-' + target )[0];
        let main = document.getElementsByClassName('list-select-content')[0];
        let letterParent = document.getElementsByClassName('letter-container' )[0];
        if(main && letter) {
            main.scrollTo(0, letter.parentNode.offsetTop)
            letter.scrollTop = letter.parentNode.offsetTop;
            letterParent.scrollTop = letter.parentNode.offsetTop;
        }
    }
    onChange = (e) => {
        let { lists } = this.state;
        let { mode, onChange } = this.props;
        let values = mode == 'multiple' ? [] : {};
        lists.forEach(x => {
            x.data.forEach(y => {
                y.active = false
            })
        })
        if( mode == 'multiple' ) {
            if(e && e.length > 1) {
                lists.forEach(x => {
                    x.data.forEach(y => {
                        e.forEach(c => {
                            if(y.lable == c) {
                                y.active = true;
                                values.push({
                                    lable: y.lable,
                                    value: y.value
                                })
                            }
                        })
                    })
                })
            }
        }
        onChange && onChange(values) 
        this.setState({
            lists
        })
    }
    // 选择下拉菜单
    onSelect = (item, parentIndex, childIndex) => {
        let { mode, value, onChange } = this.props;
        let { lists  } = this.state;
        if(lists[parentIndex].data[childIndex].active) {
            lists[parentIndex].data[childIndex].active = false;
            if(mode == 'multiple') {
                let newValue  = JSON.parse(JSON.stringify(value))
                value.forEach((x, index) => {
                    if(x.value == item.value) {
                        newValue.splice(index, 1)
                    }
                })
                value = newValue;
            } else {
                value = {}
            }
        } else {
            if(mode == 'multiple') {
                value.push ({
                    value: lists[parentIndex].data[childIndex].value,
                    lable: lists[parentIndex].data[childIndex].lable
                })
            } else {
                lists.forEach(x => {
                    x.data.forEach(y => {
                        y.active = false
                    })
                })
                value = {
                    value: lists[parentIndex].data[childIndex].value,
                    lable: lists[parentIndex].data[childIndex].lable
                }
                this.setState({
                    open: false
                })
            }
            lists[parentIndex].data[childIndex].active = true;
        }
        onChange && onChange(value);
        this.setState ({
            lists
        })
    } 
    // 搜索
    onSearch = (val) => {
        console.log('val', val)
        // datas.forEach((item) => {

        // })
    }
    render () {
        let { mode, value, showSearch } = this.props;
        let { open, autoFocus } = this.state;
        let selectVal = '';
        if( mode == 'multiple') {
            selectVal = [];
            value.forEach(item => {
                selectVal.push(item.lable)
            })
        } else {
            selectVal = value.lable || undefined
        }
        console.log('open', open)
        console.log('autoFocus', autoFocus)
        return (
            <div className = 'select-letter-sort'>
                
                <Select 
                    placeholder = '请选择'
                    className = 'select-letter-main'
                    notFoundContent = '暂无数据'
                    autoFocus = { autoFocus }
                    // allowClear
                    showSearch = { showSearch }
                    filterOption = { false }
                    mode = { mode }
                    open = { open }
                    value = { selectVal }
                    getPopupContainer = { triggerNode => triggerNode.parentElement }
                    dropdownRender = { this.dropdownRender }
                    onMouseDown = { this.onMouseDown }
                    onFocus = { this.onFocus }
                    onBlur = { this.onBlur }
                    onSelect = { this.onSelect }
                    onChange = { this.onChange }
                    onSearch = { this.onSearch }
                />
               
            </div>
        )
    }
}
SelectLetterSort.defaultProps = {
    showSearch: true,
    listheight: 256,
    value: {},
    mode: 'multiple' // 
}
SelectLetterSort.propTypes = {
    showSearch: PropTypes.bool,               // 下拉框高度 默认256
    listheight: PropTypes.number,               // 下拉框高度 默认256
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),               // 下拉框高度 默认256
    mode: PropTypes.string,                      // 是否多选 multiple' 
    onChange: PropTypes.func                    
}

export default SelectLetterSort;
