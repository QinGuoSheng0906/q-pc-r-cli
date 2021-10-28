/*
*  入口文件
*/

import React from 'react';
import { render } from 'react-dom';

import App from './App.jsx';

//全局公共样式
import './assets/styles/global.less';

render(
    <App />, 
    document.getElementById('root')
);