import { Button, Upload, Message, Loading, Input } from 'element-ui'
import Vue from 'vue'


const arr = [Button, Upload, Input, Loading]


arr.forEach(i => {
    Vue.use(i)
})


Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
