import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import VueBus from 'vue-bus'
import local from '../store/localDb.js'
import Index from '../pages/index.vue'


Vue.use(VueRouter)
Vue.use(VueBus)

var router = new VueRouter({
    routes: [{
        path: '/',
        component: resolve => require([Index],resolve),
        children: [{
                
            }
        ]
    }]
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    //关闭浏览器重新进入界面时，进入首页，而不是上次保存的界面
    if (from.fullPath === '/' && to.fullPath === '/index') {
        localStorage.setItem('nav_index', 1)
    }
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (store.logined === true) { // 判断是否已经登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    if (local.getUserId() === null) { // 若没有卡券id
        //window.location.href = 'http://member.koudaiqifu.cn/apply_store/index';
        next();
    } else {
        next();
    }
})

export default router
