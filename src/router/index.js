import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from '../views/Add.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/add',
        name: 'Add',
        component: Add
    }
]

const router = new VueRouter({
    routes
})

export default router
