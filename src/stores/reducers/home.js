
import { UPDATE_HOME } from '@actions/home';

// 初始数据
const InitState = {
    homeData: {}
}

export default function (state = InitState, action) {
    switch (action.type) {
    case UPDATE_HOME:
        return {
            ...state,
            homeData: action.data
        }
    default:
        return state;    
    }
}