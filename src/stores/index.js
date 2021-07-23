/*
*  全局数据状态
*
 */
import { createStore, applyMiddleware } from 'redux';
// 中间件处理异步
import thunk from 'redux-thunk';
// 引入规则文件
import Reducers from './reducers'

// 数据状态持久化, 本地缓存
import  { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'


// 需要缓存的状态
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,           // 查看 'Merge Process' 部分的具体情况,
    whitelist: [ '' ]                           // 指定需要缓冲的数据，不指定将缓存所有 [ 'Home' ]
    // blacklist: ['navigation']                // 指定不需要缓冲的数据，缓存黑名单
}

const myPersistReducer = persistReducer(persistConfig, Reducers)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(myPersistReducer)

export default store;