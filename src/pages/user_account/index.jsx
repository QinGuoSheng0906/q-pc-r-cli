/* eslint-disable react/self-closing-comp */
/*
*   登录--注册--忘记密码
*   秦国胜
*   2021/08/05
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { layoutForm } from '@lib/utils';

import { Form, Button, Spin } from 'antd';

import Login from './login'; // 登录

import './style.less';


class UserAccount extends Component {
    render () {
        let { spinInfo } = this.props;
        return (
            <div className = 'user-account'>
                <div className = 'container'>
                    <Spin  delay = { 100 } spinning = { spinInfo.loading }>
                        <h3 className = 'title f-s-24'>登录</h3>
                        <div className = 'content'>
                            <Form 
                                { ...{
                                    ...layoutForm(5, 18),
                                    initialValues:{
                                        remember: true
                                    }
                                    // onFinish: onFinish
                                } }
                            >
                                <Login />
                                <div className = 't-c'>
                                    <Button type = 'primary' htmlType = 'submit' className = 'submit-btn'>
                                        提&nbsp;&nbsp;&nbsp;&nbsp;交
                                    </Button>
                                </div>
                                <footer className = 'f-c m-t-20 footer-content'>
                                    <div className = 'f-l footer-register'>注册</div>
                                    <div className = 'f-r footer-password'>忘记密码？</div>
                                </footer>
                            </Form>
                        </div>
                    </Spin>
                </div>
            </div>
        )
    }
}

UserAccount.propTypes = {
    spinInfo: PropTypes.object,
    dispatch: PropTypes.func
};
 

function mapProps (state){
    return {
        spinInfo: state.spinInfo
    };
}

export default connect(mapProps)(UserAccount)
