import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from '../views/Add.vue'
import Home from '../views/Home.vue'
import Mod from '../views/Mod.vue'

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
    },
    {
        path: '/mod',
        name: 'Mod',
        component: Mod
    },
]

const router = new VueRouter({
    routes
})

export default router
