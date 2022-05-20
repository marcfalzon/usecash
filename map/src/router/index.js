import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from '../views/Add.vue'
import Auth from '../views/Auth.vue'
import FAQ from '../views/FAQ.vue'
import Guide from '../views/Guide.vue'
import Profile from '../views/Profile.vue'

import Mod from '../views/Mod.vue'
import ModDashboard from '../views/mod/Dashboard.vue'
import ModMerchants from '../views/mod/Merchants2.vue'
import ModUsers from '../views/mod/Users.vue'
import ModIssues from '../views/mod/Issues.vue'
import ModNotifs from '../views/mod/Notifs.vue'
import ModMapTools from '../views/mod/MapTools.vue'
import ModDbTools from '../views/mod/DbTools.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Guide
    },
    {
        path: '/add',
        component: Add
    },
    {
        path: '/auth',
        component: Auth
    },
    {
        path: '/auth/:authKey',
        component: Auth
    },
    {
        /* FAQ */
        path: '/faq',
        component: FAQ
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
        component: Profile
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
    mode: process.env.BASE_URL === '/' ? 'history': 'hash',
    base: process.env.BASE_URL,
    routes,
})

export default router
