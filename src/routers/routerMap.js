/**
 *  路由管理
 */

// import Loadable from './loadable'                           // 按需加载
import AsyncComponent from './async-component '                           // 按需加载
import Home from '@pages/home';
/**
 * @params
   * title: '首页',                          // 标题
   * name: 'home',                          // 名称
   * icon: '',                              // 图标
   * path: '/home',                         // 路由
   * component: Home,                       // 组件  异步使用 AsyncComponent 高级组件包装
   * isSubMenu: false,                      // 是否是下拉菜单   true 是        false 不是     默认不是
   * isShow: false                          // 导航菜单是否显示 true 不显示     false 显示     默认显示
 * 
 */

let routerMap = [
    {
        title: '首页',
        name: 'home',
        icon: '',
        path: '/home',
        component: Home
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
                component: AsyncComponent(() => import('@pages/list')),
                children: [
                    {
                        title: '列表-详情页',                    
                        name: 'list-detail',
                        path: '/list/detail', 
                        isShow: true,             
                        component: AsyncComponent(() => import('@pages/list/detail'))
                    }
                ]
            },
            {
                title: '订单页',                    
                name: 'order',
                path: '/order',              
                component: AsyncComponent(() => import('@pages/order')),
                children: [
                    {
                        title: '订单-详情页',                    
                        name: 'order-detail',
                        path: '/order/detail', 
                        isShow: true,             
                        component: AsyncComponent(() => import('@pages/order/detail'))
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
                component: AsyncComponent(() => import('@pages/hooks'))  
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