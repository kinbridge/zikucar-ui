import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index.vue'
import register from '@/views/register/index.vue'
import home from '@/views/home/index.vue'
import error404 from '@/views/404/index.vue'
// 网站首页
import homePage from '@/views/home/homePage.vue'
// 网站统计
import homePageEchart from '@/views/home/homePageEchart.vue'


// 用户管理
import userList from '@/views/user/userList.vue'
import deptList from '@/views/user/deptList.vue'
import positionList from '@/views/user/positionList.vue'

// 附件管理
import attachmentList from '@/views/attach/attchmentList.vue'
// 产品
import projectManagement from '@/views/projectManagement/thinkBaseInfoList.vue'
import projectType from '@/views/projectManagement/thinkTypeList.vue'


Vue.use(Router)

// 添加这下面一段代码，就可以解决报错

export default new Router({

    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: '/homePage',
            hidden: true
        },
        {
            path: '/homePage',
            component: homePage,
            name: 'homePage',
            hidden: true,
            meta: {title: '首页'}
        },
        {
            path: '/login',
            component: login,
            name: 'login',
            hidden: true,
            meta: {title: '登录'}
        },
        {
            path: '/register',
            component: register,
            name: 'register',
            hidden: true,
            meta: {title: '注册'}
        },
        {
            path: '*',
            component: error404,
            name: '404',
            hidden: true,
            meta: {title: '404'}
        },
        {
            path: "/home",
            redirect: '/home/homePageEchart',
            hidden: true
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                {
                    path: 'homePageEchart',
                    name: 'homePageEchart',
                    component: homePageEchart,
                    meta: {title: '网站访问', icon: 'fa fa-user'}
                },
                {
                    path: 'deptList',
                    name: 'deptList',
                    component: deptList,
                    meta: {title: '部门管理', icon: 'fa fa-user'}
                },
                {
                    path: 'positionList',
                    name: 'positionList',
                    component: positionList,
                    meta: {title: '岗位管理', icon: 'fa fa-user'}
                },
                {
                    path: 'user',
                    name: '用户管理',
                    component: userList,
                    meta: {title: '用户管理', icon: 'fa fa-user'}
                },
                {
                    path: 'projectType',
                    name: 'projectType',
                    component: projectType,
                    meta: {title: '产品类型管理', icon: 'fa fa-database'}
                },
                {
                    path: 'projectManagement',
                    name: 'projectManagement',
                    component: projectManagement,
                    meta: {title: '产品管理', icon: 'fa fa-database'}
                },
                {
                    path: 'attachmentList',
                    name: 'attachmentList',
                    component: attachmentList,
                    meta: {title: '附件管理', icon: 'fa fa-file'}
                },
            ]
        }
    ]
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
