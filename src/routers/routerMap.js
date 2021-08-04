/**
 *  路由管理
 */

import Loadable from './loadable'                           // 按需加载
import Home from '@pages/home';

let routerMap = [
    {
        title: '首页',
        name: 'home',
        icon: '',
        path: '/home',
        component: Home,                        // 是否异步
        isSubMenu: false,                       // 是否是下拉菜单   true 是         false 不是     默认不是
        isShow: false                           // 是否显示         true 不显示     false 显示     默认显示
    },
    {
        title: '导航一',
        name: 'nav1',
        icon: '',
        isSubMenu: true,
        children: [
            {
                title: '列表页',                    
                name: 'list',
                path: '/list',              
                component: Loadable(() => import('@pages/list'))
            },
            {
                title: '列表二',
                name: 'list2',
                icon: '',
                isSubMenu: true,
                children: [
                    {
                        title: '列表页二-二',                    
                        name: 'list',
                        path: '/list',              
                        component: Loadable(() => import('@pages/list'))
                    }
                ]
            }
        ]
    },
    {
        title: 'ReactStudy',
        name: 'reactStudy',
        icon: '',
        isSubMenu: true,
        children: [
            {
                title: 'Hooks',                    
                name: 'hooks',
                path: '/hooks',              
                component: Loadable(() => import('@pages/hooks'))  
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
    return routerMap;
}

routerMap = initMenuData(routerMap);

export default routerMap