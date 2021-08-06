
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {  Menu } from 'antd';
import { HomeOutlined, MergeCellsOutlined  } from '@ant-design/icons';

import routerMap from '@/routers/routerMap'; // 路由

import { dataType, clone } from '@/lib/utils'; // 工具

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class Sider extends Component {

    // 点击菜单
    handleMenuItem = ({ key }) => {
        let { handleMenuItem } = this.props;
        let itemData = {};
        let queryItem = (data) => {
            for(let i=0; i<data.length; i++){
                if(dataType(data[i].children).isArray && data[i].children.length){
                    queryItem(data[i].children)
                }
                if(data[i].key == key ){
                    itemData = data[i];
                    break;
                }
            }
        }
        queryItem(routerMap);
        handleMenuItem && handleMenuItem(itemData);
    }

    // 菜单渲染
    menuView = () => {
        let routerMaps = clone(routerMap);
        if(!dataType(routerMaps).isArray || routerMaps.length <= 0 ) return;
        let views = (data) => {
            if(!dataType(data).isArray || data.length <= 0) return;
            return data.map((item) => {
                if(item.isSubMenu && dataType(item.children).isArray && item.children.length) {
                    return <SubMenu key = { item.key } icon = { <MergeCellsOutlined /> } title = { item.title }> 
                        {
                            views(item.children)
                        }
                    </SubMenu>
                } else {
                    if(!item.isShow){
                        return (
                            <MenuItem key = { item.key } icon = { <HomeOutlined /> }>{ item.title }</MenuItem> 
                        ) 
                    } else  return ''
                   
                }
            })
        }
        return views(routerMaps)
    }
    render () {
        let { navOpenKeys,handleSubMenu, navselectedKeys  } = this.props;
        // console.log('navOpenKeys', navOpenKeys)
        // console.log('navselectedKeys', navselectedKeys)
        return (
            <Menu
                onClick = { this.handleMenuItem }
                onOpenChange = { handleSubMenu }
                // style = { { width: 256 } }
                selectedKeys = { navselectedKeys }
                openKeys = { navOpenKeys }
                mode = 'inline'
                theme = 'dark'
            >
                { /* <MenuItem key = '01'>首页</MenuItem>
                <SubMenu key = 'sub1' icon = { <MailOutlined /> } title = 'Navigation One'>
                    <MenuItem key = '1'>Option 1</MenuItem>
                    <Menu.Item key = '2'>Option 2</Menu.Item>
                </SubMenu> */ }
                {
                    this.menuView()
                }
            </Menu>
        )
    }
}

Sider.propTypes={
    navOpenKeys: PropTypes.array,
    navselectedKeys: PropTypes.array,
    handleMenuItem: PropTypes.func,
    handleSubMenu: PropTypes.func
}

export default Sider;
