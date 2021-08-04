/*
*整合合并  reucer加工函数
*秦国胜
*2020-07-02
*/
import { combineReducers } from 'redux';

import home from './home';
import modal from './modal';

export  default combineReducers({
    home,
    modal
});
