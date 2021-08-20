import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from '../views/Add.vue'
import FAQ from '../views/FAQ.vue'
import Learn from '../views/Learn.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

import Mod from '../views/Mod.vue'
import ModDashboard from '../views/mod/Dashboard.vue'
import ModMerchants from '../views/mod/Merchants.vue'
import ModUsers from '../views/mod/Users.vue'
import ModIssues from '../views/mod/Issues.vue'
import ModNotifs from '../views/mod/Notifs.vue'
import ModMapTools from '../views/mod/MapTools.vue'
import ModDbTools from '../views/mod/DbTools.vue'

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
        /* FAQ */
        path: '/faq',
        component: FAQ
    },
    {
        /* Learn */
        path: '/learn',
        component: Learn
    },
    {
        path: '/mod',
        component: Mod,
        children: [
            {
                path: '',
                component: ModDashboard,
            },
            {
                path: 'merchants',
                component: ModMerchants,
            },
            {
                path: 'users',
                component: ModUsers,
            },
            {
                path: 'issues',
                component: ModIssues,
            },
            {
                path: 'notifs',
                component: ModNotifs,
            },
            {
                path: 'map-tools',
                component: ModMapTools,
            },
            {
                path: 'db-tools',
                component: ModDbTools,
            },
        ]
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
    mode: 'hash',
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
