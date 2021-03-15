import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/pdf'
        },
        {
            path: '/pdf',
            component: () => import('@/components/home')
        }
    ]

})