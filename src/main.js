import Vue from 'vue'
import App from './App.vue'
import Http from '@/assets/js/http'
import "@/plugins"
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.prototype.$http = Http

new Vue({
  render: h => h(App),
}).$mount('#app')
