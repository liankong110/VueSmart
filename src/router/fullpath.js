let fullRouter = [{
    path: '/',
    name: '首页',
    component: (res) => require(['../views/index.vue'], res),
    children: [{
        path: '/user/index',
        name: '系统管理',
        mete: {
            name: '系统管理',
            icon: ''
        },
        component: (res) => require(['../views/null.vue'], res),
        children: [
            {
                path: '/user/index',
                name: '用户列表',
                component: (res) => require(['../views/user/index.vue'], res),
                mete: {
                    name: '用户列表',
                    icon: ''
                }
            },
            {
                path: '/user/add',
                name: '用户新增',
                component: (res) => require(['../views/user/add.vue'], res),
                mete: {
                    name: '用户新增',
                    icon: ''
                },
                isHide:true
            },
            {
                path: '/role/index',
                name: '角色管理',
                 component: (res) => require(['../views/user/index.vue'], res),
                mete: {
                    name: '角色管理',
                    icon: ''
                }
            }
        ]

    }]
}];

export default fullRouter;