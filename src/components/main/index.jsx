/**
 * 最外层容器
 * 秦国胜
 * 2021/07/02
 */

import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const LayoutHeader = Layout.Header;
const LayoutSider = Layout.Sider;
const LayoutFooter = Layout.Footer;
const { SubMenu } = Menu;

// import Sider from './sider';
// import Header from './header';
// import Footer from './footer';

import './style.less'

class Main extends Component {
    handleClick = (e) => {
        console.log('click ', e);
    }

    render () {
        return (
            <Layout
                breakpoint = 'lg'
                className = 'layout-container'
                // collapsedWidth = { 0 }
            >
                <LayoutSider>
                    <Menu
                        onClick = { this.handleClick }
                        // style = { { width: 256 } }
                        defaultSelectedKeys = { [ '1' ] }
                        defaultOpenKeys = { [ 'sub1' ] }
                        mode = 'inline'
                    >
                        <SubMenu key = 'sub1' icon = { <MailOutlined /> } title = 'Navigation One'>
                            <Menu.ItemGroup key = 'g1' title = 'Item 1'>
                                <Menu.Item key = '1'>Option 1</Menu.Item>
                                <Menu.Item key = '2'>Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key = 'g2' title = 'Item 2'>
                                <Menu.Item key = '3'>Option 3</Menu.Item>
                                <Menu.Item key = '4'>Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key = 'sub2' icon = { <AppstoreOutlined /> } title = 'Navigation Two'>
                            <Menu.Item key = '5'>Option 5</Menu.Item>
                            <Menu.Item key = '6'>Option 6</Menu.Item>
                            <SubMenu key = 'sub3' title = 'Submenu'>
                                <Menu.Item key = '7'>Option 7</Menu.Item>
                                <Menu.Item key = '8'>Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key = 'sub4' icon = { <SettingOutlined /> } title = 'Navigation Three'>
                            <Menu.Item key = '9'>Option 9</Menu.Item>
                            <Menu.Item key = '10'>Option 10</Menu.Item>
                            <Menu.Item key = '11'>Option 11</Menu.Item>
                            <Menu.Item key = '12'>Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
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
export default Main