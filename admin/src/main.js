import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import http from './http.js'
import moment from 'moment'

Vue.filter("dataFormat", function (dataStr, pattren = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattren)
})


Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
