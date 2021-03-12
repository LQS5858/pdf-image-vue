import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: '/pdf',
    routes: [
        {
            path: '*',
            redirect: '/image'
        },
        {
            path: '/image',
            component: () => import('@/components/home')
        }
    ]

})