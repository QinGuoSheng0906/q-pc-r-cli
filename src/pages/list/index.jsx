/*
*  List
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'antd';


class List extends Component {
    goDetail = () => {
        this.props.history.push({ pathname: '/list/detail' })
    }
    render () {
        return (
            <div className = 'p-10'>
            这里是List页
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

List.propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func
};
export default connect(propMap)(List) ;