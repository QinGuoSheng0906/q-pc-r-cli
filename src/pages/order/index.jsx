/*
*  order
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import SelectLetterSort from '@components/form_item/select_letter_sort';

import './style.less'

class Order extends Component {
    state = {
        selectVal: []
    }
    goDetail = () => {
        this.props.history.push({ pathname: '/order/detail' })
    }
    onChange = (val) =>  {
        console.log('val', val)
        this.setState({
            selectVal: val
        })
    }
    render () {
        let { selectVal } = this.state;
        return (
            <div className = 'p-10 order-list-container'>
            这里是order页
                <Button onClick = { this.goDetail }>详情页</Button>
                <div>
                    <SelectLetterSort 
                        value = { selectVal }
                        onChange = { this.onChange }
                    />
                </div>
            </div>
        )
    }
}

function propMap (state) {
    return {
        spinInfo: state.spinInfo
    };
}

Order.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func
};
export default connect(propMap)(Order) ;