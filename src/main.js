import Vue from 'vue'
import App from './App.vue'
import Http from '@/assets/js/http'
import "@/plugins"
import router from '@/router'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'

console.log('deploy');
Vue.config.productionTip = false
Vue.prototype.$http = Http

let instance = null

function init (props = {}) {
  const { container } = props || {}
  instance = new Vue({
    render: h => h(App),
    router
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
} else {
  init()
}

function storeTest (props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    })
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  init(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}