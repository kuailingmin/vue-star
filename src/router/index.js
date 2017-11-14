import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'

Vue.use(VueRouter)


var router = new VueRouter({
    routes: [
        {
            path: '/',
            component: resolve => require(['../pages/index.vue'],resolve)
        }
    ]
})

export default router
