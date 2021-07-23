/**
 *  路由管理
 */

import Loadable from './loadable'                           // 按需加载
let routerMap = [
    {
        isMenu: false,                      // 是否是下拉 true 不是 false 是 默认下拉
        isShow: true,                       // 是否显示  true  不显示 false 显示
        rightControl: '6',                  // 权限控制
        icon: 'home',                       // 图标
        title: '首页',                       // 标题
        name: 'home'
    },
    {
        isMenu: true,                     // 是否是下拉 true 不是 false 是 默认下拉
        isShow: true,                     // 是否显示  true 不显示 false 默认显示
        rightControl: '6',                // 权限控制
        icon: 'home',                     // 图标
        title: '导航一',                  // 标题
        name: 'nav一',
        children: [
            {
                isShow: true,                     
                title: '列表页',                    
                name: 'list',
                path: '/list',              
                component: Loadable(() => import('@pages/list'))
            }
        ]
    }

];

// 定义Key
let initMenuData = (routerMap) => {
    let init = (routers,parentKey) => {
        routers.forEach((item,index) => {
            item.key = parentKey + index
            if (item.children && item.children.length > 0) {
                init(item.children, item.key + '-')
            }
        })
    }
    init(routerMap,'')
    return  routerMap;
}

routerMap = initMenuData(initMenuData);

export default routerMap