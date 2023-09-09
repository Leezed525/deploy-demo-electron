import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './plugins/element.js'

Vue.use(ElementUI);

import request from "@/utils/request" // 实现 form generator 使用自己定义的 axios request 对象
Vue.prototype.$axios = request


import router from "./router";

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
