
import { UPDATE_SPIN } from '@/stores/actions/spin-info';

// 初始数据
const InitState = {
    loading: false, // loading
    loadingPage: false, // 加载页面
    loadingTable: false, // 表格加载
    loadingForm: false, // 表单加载
    loadingModal: false, // 模态窗口加载
    loadingMinAuditor: false // 模态窗口加载
}

export default function (state = InitState, action) {
    switch (action.type) {
    case UPDATE_SPIN:
        return {
            ...state,
            ...action.data
        }
    default:
        return state;    
    }
}