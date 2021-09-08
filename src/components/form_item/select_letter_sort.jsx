/*
*   中文按字母顺序 下拉排序
*/
import React, { Component } from 'react'
import  { Select } from 'antd'

// const { Option,OptGroup } = Select;
const { Option } = Select;

class SelectLetterSort extends Component {
    render () {
        return (
            <div >
                <Select 
                    className = 'select-letter-sort'
                    placeholder = '请选择'
                    allowClear
                    getPopupContainer = { triggerNode => triggerNode.parentNode }
                >
                    <div>
                        <div>A</div>
                        <div>B</div>
                        <div>C</div>
                    </div>
                    <Option value = '1'>111</Option>
                    <Option value = '2'>222</Option>
                    <Option value = '3'>333</Option>
                    { /* <OptGroup key = 'A' label = 'A'>
                        <Option value = '2'>222</Option>
                    </OptGroup>
                    <OptGroup key = 'B'  label = 'B'>
                        <Option value = '3'>3333</Option>
                    </OptGroup> */ }
                </Select>
            </div>
        )
    }
}

export default SelectLetterSort;