import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from '../views/Add.vue'
import Help from '../views/Help.vue'
import Home from '../views/Home.vue'
import Mod from '../views/Mod.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    // {
    //     path: '/@*/rewards',
    //     component: AccountRewards
    // },
    // {
    //     path: '/@*/wallet',
    //     component: AccountWallet
    // },
    {
        path: '/add',
        component: Add
    },
    {
        /* Help */
        path: '/help',
        component: Help
    },
    {
        path: '/mod',
        component: Mod
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        /* (Wildcard) Account Profile */
        // NOTE: Avoid other wildcard conflicts.
        path: '/@*',
        component: Profile
    },
    {
        /* 404 Error */
        path: '*',
        component: Home
    }
]

const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    // mode: process.env.BASE_URL === '/' ? 'history': 'hash',
    // mode: 'hash',
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
