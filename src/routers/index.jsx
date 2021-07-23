/*
*  路由配置
*  秦国胜
*/

import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import ErrorBoundary from './errorBoundary';  
import Loadable from './loadable';  

import Main from '@components/main';
import Err404 from '@pages/404';
import Login from '@pages/login';
import Home from '@pages/home';
// import List from '@pages/list';

const isRedirect = false;

class RouterApp extends Component {
    render () {
        return (
            <HashRouter>
                <ErrorBoundary>
                    <Switch>
                        <Route path = '/login' exact component = { Login } />
                        <Route path = '/' render = { () => {
                            return (
                                isRedirect ?
                                    <Redirect to = '/login' component = { Login } />
                                    :
                                    <Main>
                                        <Switch>
                                            <Route path = '/' exact component = { Home } />
                                            <Route path = '/list' exact component = { Loadable(() => import('@pages/list')) } />
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