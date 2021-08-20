<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button @click="open" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!--
                        Heroicon name: outline/menu
                        -->
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!--
                        Heroicon name: outline/x
                        -->
                        <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                    <div class="flex-shrink-0 flex items-center" @click="home">
                        <img class="block lg:hidden h-8 w-auto" src="@/assets/bitcoin-cash-bch-logo.svg" alt="Use.cash">
                        <!-- <img class="hidden lg:block h-8 w-auto" src="@/assets/workflow-logo-indigo-500-mark-white-text.svg" alt="Use.cash"> -->
                        <img class="hidden lg:block h-8 w-auto" src="@/assets/use-cash-logo.svg" alt="Use.cash">
                    </div>
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button @click="mod" class="hidden sm:mr-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Moderation Center</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </button>

                    <button @click="add" class="sm:mr-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Add a new merchant</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </button>

                    <button @click="info" class="sm:mr-2 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Learn more about crypto</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <!-- Profile dropdown -->
                    <div class="ml-3 relative">
                        <div>
                            <!-- <button @click="profile" type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true"> -->
                            <button @click="profile" type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="sr-only">Open profile menu</span>
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </button>
                        </div>

                        <!--
                        Dropdown menu, show/hide based on menu state.

                        Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                        Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                        -->
                        <div v-if="showMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="sm:hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="javascript://" :class="unselected" aria-current="page" @click="add">ADD MERCHANT</a>

                <!-- <a href="javascript://" :class="selected" @click="mod">Mod</a> -->

                <!-- <a href="javascript://" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a> -->

                <!-- <a href="javascript://" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a> -->
            </div>
        </div>
    </nav>

</template>

<script>
export default {
    props: {
        isMenuOpen: Boolean,
    },
    data: () => ({
        showMenu: null,
    }),
    computed: {
        selected()  {
            // return `bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium` // small
            return `bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium`
        },

        unselected()  {
            // return `text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium` // small
            return `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`
        },
    },
    methods: {
        add() {
            this.$router.push('/add')
        },

        info() {
            this.$router.push('/faq')
            // this.$router.push('/learn')
        },

        home() {
            this.$router.push('/')
        },

        mod() {
            this.$router.push('/mod')
        },

        profile() {
            this.$router.push('/@nyusternie')
        },

        open() {
            this.$emit('openMenu')
        },

    },
    created: function () {
        this.showMenu = false
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
