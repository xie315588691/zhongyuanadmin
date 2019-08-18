import Vue from 'vue'
import Router from 'vue-router'

import mainBox from './views/main.vue'
import userBox from './views/user.vue'
import loginBox from './views/login.vue'
import articleList from './views/article/articleList.vue'
import articleAdd from './views/article/articleAdd.vue'

import menuList from './views/menu/menuList.vue'
import menuAdd from './views/menu/menuadd.vue'

import bannerList from './views/banners/bannerList.vue'
import bannerAdd from './views/banners/bannerAdd.vue'

import messageList from './views/message/messageList.vue'
import pageInfo from './views/message/webseo.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            component: loginBox,
            meta: {isPublic: true}

        },
        {
            path: '/',
            name: 'home',
            redirect: '/article/list'
        },
        {
            path: '/',
            component: mainBox,
            children: [
                {
                    path: '/article/list',
                    component: articleList
                },
                {
                    path: '/article/add',
                    component: articleAdd
                }, {
                    path: '/article/edit/:id',
                    component: articleAdd,
                    props: true
                },
                {
                    path: '/menu/list',
                    component: menuList
                },
                {
                    path: '/menu/add',
                    component: menuAdd
                },
                {
                    path: '/menu/edit/:id',
                    component: menuAdd,
                    props: true
                },
                {
                    path: '/banner/list',
                    component: bannerList
                },
                {
                    path: '/banner/add',
                    component: bannerAdd
                },
                {
                    path: '/banner/edit/:id',
                    component: bannerAdd,
                    props: true
                },
                {
                    path: '/message/list',
                    component: messageList
                },
                {
                    path: '/pageInfo',
                    component: pageInfo
                },
                {
                    path: '/personInfo',
                    component: userBox
                }
            ]
        }
    ]
})
//处理静态页面访问
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !sessionStorage.token) {
        return next('/login')
    }
    next()
})

export default router
