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
        for(let i=0 ; i< 100; i++){
            listData.push(i)
        }
        this.setState({
            listData
        })
    }
    goDetail = () => {
        this.props.history.push({ pathname: '/list/detail' })
    }
    // 语音播报
    autoAudio = () => {
        /**
        * lan：固定值 zh。语言选择,目前只有中英文混合模式，填写固定值 zh
        * ie:编码方式
        * spd：语速，取值 0-9，默认为 5 中语速
        * text：合成的文本，使用 UTF-8 编码。小于 512 个中文字或者英文数字。（文本在百度服务器内转换为 GBK 后，长度必须小于 1024 字节）
        */
        // 百度语音合成：或者使用新版地址https://tsn.baidu.com/text2audio
        let str = `
        所爱隔山海，山海不可平；
        然，山亦力可跃，海亦舟可渡；
        故，山海皆可平；
        但，山海平，吾意难平；
        `;
        let url ='http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=' + encodeURI(str);
        let n = new Audio(url);
        n.src = url;
        n.play();

    }
    render () {
        const { listData } = this.state;
        console.log('listData', listData)
        return (
            <div className = 'p-10'>
            这里是List页
                <Button onClick = { this.goDetail }>详情页</Button>
                <div className = 'm-t-10'>
                    <Button onClick = { this.autoAudio }>播放</Button>
                </div>
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