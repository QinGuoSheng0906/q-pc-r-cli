/*
*  List
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import './style.less'

class List extends Component {
    state = { 
        listData: []
    }
    componentDidMount () {
        let listData = [];
        for(let i=0 ; i< 9999; i++){
            listData.push(i)               
        }
        this.setState({
            listData
        })
    }
    goDetail = () => {
        this.props.history.push({ pathname: '/list/detail' })
    }
    render () {
        const { listData } = this.state;
        console.log('listData', listData)
        return (
            <div className = 'p-10'>
            这里是List页
                <Button onClick = { this.goDetail }>详情页</Button>
                <ul className = 'list-container'>
                    {
                        listData.map((item, index) => {
                            return (
                                <li className = 'item m-t-10' key = { index }>{ index } </li>
                            )
                        })
                    }
                </ul>
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