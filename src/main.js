import Vue from 'vue'
import router from './router'
import App from './App'
import VueLazyload from 'vue-lazyload'
import api from './api/api.js'
import URL from './config/urls.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'


import VueBus from 'vue-bus';
import qs from 'qs'

Vue.use(VueBus);
Vue.use(ElementUI);
//图片懒加载
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
    preLoad: 0.8,
    error: '',
    loading: '',
    attempt: 1,
    listenEvents: [ 'scroll' ]
  })

Vue.prototype.$api = api
Vue.prototype.$url = URL
Vue.prototype.$qs = qs
new Vue({
    el: '#app',
    router,
    template: '<App></App>',
    components: {
        App
    }
})
