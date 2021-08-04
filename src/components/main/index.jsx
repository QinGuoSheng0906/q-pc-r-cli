/**
 * 最外层容器
 * 秦国胜
 * 2021/07/02
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

const { Content } = Layout;
const LayoutHeader = Layout.Header;
const LayoutSider = Layout.Sider;
const LayoutFooter = Layout.Footer;


import Sider from './sider';
// import Header from './header';
// import Footer from './footer';

import './style.less'

class Main extends Component {

    // 左侧导航栏变化 跳转路由
    leftMenuChange = (item) => {
        // console.log(' this.props', this.props.history )
        // console.log('item ', item);
        this.props.history.push({ pathname: item.path })
    }

    render () {
        return (
            <Layout
                breakpoint = 'lg'
                className = 'layout-container'
                // collapsedWidth = { 0 }
            >
                <LayoutSider>
                    <Sider leftMenuChange = { this.leftMenuChange } />
                </LayoutSider>
                <Layout>
                    <LayoutHeader>Header</LayoutHeader>
                    <Content> { this.props.children }</Content>
                    <LayoutFooter>Footer</LayoutFooter>
                </Layout>
            </Layout>
        )
    }
}

Main.propTypes={
    history: PropTypes.any,
    children: PropTypes.any
}

export default withRouter(Main)