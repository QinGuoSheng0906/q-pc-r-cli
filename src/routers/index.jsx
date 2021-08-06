/*
*  路由配置
*  秦国胜
*/

import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import ErrorBoundary from './errorBoundary'; // 错误边界

import routerMap from '@/routers/routerMap'; // 路由
import { dataType, clone } from '@/lib/utils'; //  工具


import Main from '@components/main'; // 布局容器组件
import Err404 from '@pages/404';
import Login from '@/pages/user-account';

const isRedirect = false; // 重定向

class RouterApp extends Component {
    // 路由视图
    routerView = () => {
        let routerMaps = clone(routerMap);
        if(!dataType(routerMaps).isArray || routerMaps.length <= 0 ) return;
        let routers = []; // 路由
        let views = (data) => { // 提取路由
            if(!dataType(data).isArray || data.length <= 0) return;
            return data.forEach((item) => {
                if(item.children && dataType(item.children).isArray && item.children.length) {
                    if(!item.isSubMenu){
                        routers.push({
                            title: item.title,
                            name: item.name,
                            isShow: item.isShow,
                            path: item.path,
                            key: item.key,
                            component: item.component
                        });
                    }
                    views(item.children);
                } else{
                    if(item.name == 'home'){
                        routers.push({
                            ...item,
                            path: '/',
                            key: 'home-' + item.key
                        });
                        routers.push(item);
                    }else routers.push(item);
                }
            })
        }
        views(routerMaps);
        return routers.map((item) => { // 渲染路由
            return (
                <Route path = { item.path } key = { item.key } exact
                    render = { (props) => {
                        document.title = item.title
                        return <item.component { ...props } />
                    } }
                />
            ) 
        })
    }
    render () {
        return (
            <HashRouter >
                <ErrorBoundary>
                    <Switch>
                        <Route path = '/login' exact 
                            render = { (props) => {
                                document.title = '登录'
                                return <Login { ...props } />
                            } }
                        />
                        <Route path = '/' render = { (props) => {
                            return (
                                isRedirect ?
                                    <Redirect to = '/login' exact 
                                        render = { (props) => {
                                            document.title = '登录'
                                            return <Login { ...props } />
                                        } }
                                    />
                                    :
                                    <Main { ...props }>
                                        <Switch>
                                            {
                                                this.routerView()
                                            }
                                            <Route component = { Err404 } />
                                        </Switch>
                                    </Main>
                            )
                        } }
                        />
                        <Route component = { Err404 } />
                    </Switch>
                </ErrorBoundary>
            </HashRouter>
        )
    }
}

export default RouterApp