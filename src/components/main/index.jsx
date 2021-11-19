/**
 * 最外层容器
 * 秦国胜
 * 2021/07/02
 */

import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { dataType } from '@/lib/utils'; // 工具

import routerMap from '@/routers/routerMap'; // 路由

import { Layout  } from 'antd';

const { Content } = Layout;
// const LayoutHeader = Layout.Header;
const LayoutSider = Layout.Sider;
const LayoutFooter = Layout.Footer;


import Sider from './sider';
// import Header from './header';
// import Footer from './footer';

import './style.less'


class Main extends Component {
    state = {
        navOpenKeys: [  ], // 展开的 SubMenu 菜单项
        navselectedKeys: [ ] // 当前选中的菜单项 key 数组	
    }
    componentDidMount () {
        this.infoMenuActive()
    }
    // 处理菜单初始选中
    infoMenuActive = () => {
        let { location } = this.props; 
        if(!location) return;
        let path = location.pathname || '';
        let itemData = {};
        let queryItem = (data) => {
            for(let i=0; i<data.length; i++){
                if(dataType(data[i].children).isArray && data[i].children.length){
                    queryItem(data[i].children)
                }
                if(data[i].path == path){
                    itemData = data[i];
                    break;
                }
            }
        }
        if(path) {
            let openKeys = [];
            let selectedKeys = []
            if(path != '/') {
                queryItem(routerMap);
                if(!itemData.key) return;
                let keys = itemData.key.split('-');
                let str = '';
                let arry = [];
                keys.forEach((item, index) => {
                    str+= index == 0 ? item : '-'+ item;
                    arry.push(str)
                })
                openKeys = arry;
                selectedKeys = itemData.isShow ? [ itemData.key.slice(0,-2) ] : [ itemData.key ]
            } else {
                openKeys = [ '0' ];
                selectedKeys =  [ '0' ];
            }
            this.setState({
                navOpenKeys: openKeys,
                navselectedKeys: selectedKeys
            })
        }
    }
    // 点击subMenu 展开/关闭 
    handleSubMenu = (openKeys) => {
        this.setState({
            navOpenKeys: openKeys
        })
    }
    // 左侧导航栏变化 跳转路由
    handleMenuItem = (item) => {
        this.setState({
            navselectedKeys: [ item.key ]
        })
        this.props.history.push({ pathname: item.path })
    }
    render () {
        const { navOpenKeys, navselectedKeys } = this.state
        return (
            <Layout
                breakpoint = 'lg'
                className = 'layout-container'
                // collapsedWidth = { 0 }
            >
                <LayoutSider>
                    <Sider handleMenuItem = { this.handleMenuItem } 
                        navOpenKeys = { navOpenKeys }
                        navselectedKeys = { navselectedKeys }
                        handleSubMenu = { this.handleSubMenu }
                    />
                </LayoutSider>
                <Layout>
                    { /* <LayoutHeader>Header</LayoutHeader> */ }
                    <Content className = 'layout-content'> { this.props.children }</Content>
                    <LayoutFooter>Footer</LayoutFooter>
                </Layout>
            </Layout>
        )
    }
}

Main.propTypes={
    history: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any
}

export default Main