export default [
    {
        label: '任务中心',
        name: "taskCenter",
        meta: {
            icon: 'el-icon-picture-outline-round'
        },
        children: [
            {
                label: '我的任务',
                path: "/myDiary",
                name: "myDiary",
            },
            {
                label: '创建任务',
                path: "/createTask",
                name: "createTask",
            },
            {
                label: '任务列表',
                path: "/taskList",
                name: "taskList",
            },
        ],
    },
    {
        label: '题库管理',
        name: "questionManage",
        meta: {
            icon: 'el-icon-eleme'
        },
        children: [
            {
                label: '题库',
                path: "/question",
                name: "question",
            },
        ],
    },
    {
        label: '账号设置',
        name: "userSettings",
        meta: {
            icon: 'el-icon-setting'
        },
        children: [
            {
                label: '角色信息',
                path: "/rolelist",
                name: "rolelist",
            },
            {
                label: '修改用户信息',
                path: "/userInfo",
                name: "userInfo",
            },
        ],
    },
    {
        label: '角色管理',
        name: "role",
        meta: {
            icon: 'el-icon-s-custom'
        },
        children: [
            {
                label: '角色管理',
                path: "/roleManage",
                name: "roleManage",
            },
            {
                label: '创建角色',
                path: "/createRole",
                name: "createRole",
            },
            {
                label: '权限配置',
                path: '/permissionConfig',
                name: 'permissionConfig'
            }
        ],
    },
    {
        label: '其它',
        name: "other",
        meta: {
            icon: 'el-icon-monitor'
        },
        children: [
            {
                label: '关于我们',
                path: "/about",
                name: "about",
            },
        ],
    },
];