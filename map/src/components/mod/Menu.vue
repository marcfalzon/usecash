<template>
    <main class="flex">
        <div class="flex flex-shrink-0">
            <div class="flex flex-col">
                <div class="flex flex-col h-0 flex-1 border-4 border-yellow-500 bg-gray-600 rounded-xl shadow-lg">
                    <div class="flex-1 flex flex-col pt-5 pb-4">
                        <nav class="flex-1" aria-label="Sidebar">
                            <div class="px-2 space-y-3">
                                <router-link to="/mod" :class="[ curTab === 'dashboard' ? selected : unselected ]">
                                    <svg xmlns="http://www.w3.org/2000/svg" :class="[ curTab === 'dashboard' ? selectedTxt : unselectedTxt ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/merchants" :class="[ curTab === 'merchants' ? selected : unselected ]">
                                    <svg xmlns="http://www.w3.org/2000/svg" :class="[ curTab === 'merchants' ? selectedTxt : unselectedTxt ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/users" :class="[ curTab === 'users' ? selected : unselected ]">
                                    <svg :class="[ curTab === 'users' ? selectedTxt : unselectedTxt ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/notifs" :class="[ curTab === 'notifs' ? selected : unselected ]">
                                    <svg xmlns="http://www.w3.org/2000/svg" :class="[ curTab === 'notifs' ? selectedTxt : unselectedTxt ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/map-tools" :class="[ curTab === 'map-tools' ? selected : unselected ]">
                                    <svg :class="[ curTab === 'map-tools' ? selectedTxt : unselectedTxt ]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/db-tools" :class="[ curTab === 'db-tools' ? selected : unselected ]">
                                    <svg xmlns="http://www.w3.org/2000/svg" :class="[ curTab === 'db-tools' ? selectedTxt : unselectedTxt ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                </router-link>

                                <router-link to="/mod/issues" :class="[ curTab === 'issues' ? selected : unselected ]">
                                    <svg xmlns="http://www.w3.org/2000/svg" :class="[ curTab === 'issues' ? selectedTxt : unselectedTxt ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </router-link>
                            </div>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        curTab: null,
    }),
    watch: {
        '$route.params': function () {
            this.handleNav()
        },
    },
    computed: {
        selected() {
            return `bg-gray-200 text-gray-900 group flex justify-center py-2 text-sm font-medium rounded-md`
        },

        unselected() {
            return `text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex justify-center px-2 py-2 text-sm font-medium rounded-md`
        },

        selectedTxt() {
            return `text-gray-500 h-8 w-8`
        },

        unselectedTxt() {
            return `text-gray-400 group-hover:text-gray-500 h-8 w-8`
        },
    },
    methods: {
        handleNav() {
            const route = this.$route
            console.log('ROUTE', route);

            const path = route.path
            console.log('PATH', path);

            switch(path) {
            case '/mod/merchants':
                this.curTab = 'merchants'
                break
            case '/mod/users':
                this.curTab = 'users'
                break
            case '/mod/notifs':
                this.curTab = 'notifs'
                break
            case '/mod/map-tools':
                this.curTab = 'map-tools'
                break
            case '/mod/db-tools':
                this.curTab = 'db-tools'
                break
            case '/mod/issues':
                this.curTab = 'issues'
                break
            default:
                this.curTab = 'dashboard'
            }

        },
    },
    created: function () {
        this.handleNav()
    },
    mounted: function () {
        //
    },
}
</script>
