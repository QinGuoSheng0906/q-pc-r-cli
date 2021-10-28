

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Store from './stores';                       // 状态管理数据

//状态数据持久化 会存储在 localStorage 中
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'
const persistor = persistStore(Store);

// UI组件国际化
import { ConfigProvider } from 'antd';                                  
import zh_CN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

import Routers from './routers'; // 路由

import { Loading } from '@components/index'

 
class App extends Component {
    componentDidMount (){
        // console.log('process.env.PROCESS_ENV', process.env.PROCESS_ENV)
    }
    render () {
        return (
            <Provider store = { Store }>
                <PersistGate 
                    loading = { <Loading /> } 
                    persistor = { persistor }
                >
                    <ConfigProvider locale = { zh_CN }>
                        <Routers />
                    </ConfigProvider>
                </PersistGate>
            </Provider>
        );
    }
}
 
export default App;

