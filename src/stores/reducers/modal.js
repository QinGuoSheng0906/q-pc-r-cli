
import { UPDATE_MODAL } from '@actions/modal';

// 初始数据
const InitState = {
    loading: false,         // loading
    tableLoading: false,
    modalLoading: false
}

export default function (state = InitState, action) {
    switch (action.type) {
    case UPDATE_MODAL:
        return {
            ...state,
            ...action.data
        }
    default:
        return state;    
    }
}