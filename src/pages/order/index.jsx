/*
*  order
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'antd';


class Order extends Component {
    goDetail = () => {
        this.props.history.push({ pathname: '/order/detail' })
    }
    render () {
        return (
            <div className = 'p-10'>
            这里是order页
                <Button onClick = { this.goDetail }>详情页</Button>
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