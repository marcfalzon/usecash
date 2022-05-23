<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="hidden absolute inset-y-0 left-0 flex items-center sm:hidden">
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

                <!-- <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start cursor-pointer"> -->
                <div class="flex-1 flex items-stretch justify-start cursor-pointer">
                    <div class="ml-2 flex-shrink-0 flex items-center" @click="home">
                        <svg class="w-9 h-9 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    </div>
                </div>

                <div class="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button @click="mod" class="hidden sm:mr-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Moderation Center</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </button>

                    <button @click="add" class="sm:mr-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Add a new merchant</span>
                        <svg class="w-10 h-10 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                    </button>

                    <button @click="info" class="sm:mr-2 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                        <span class="sr-only">Learn more about crypto</span>
                        <svg class="w-10 h-10 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    </button>

                    <!-- Profile dropdown -->
                    <div class="ml-2 mr-2 relative">
                        <button @click="profile" type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open profile menu</span>
                            <img class="h-8 w-8 rounded-full" :src="avatar" alt="">
                        </button>

                        <div v-if="showMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
                                Your Profile
                            </a>

                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">
                                Settings
                            </a>

                            <a href="javascript://" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="hidden sm:hidden" id="mobile-menu">
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
/* Import modules. */
import gravatar from 'gravatar'
import { Magic } from 'magic-sdk'

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default {
    data: () => ({
        gravatarUrl: null,
        magicUser: null,
        isLoggedIn: null,
        showMenu: null,
    }),
    computed: {
        avatar() {
            if (this.gravatarUrl) {
                return this.gravatarUrl
            } else {
                return null
            }
        },
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
        },

        home() {
            this.$router.push('/')
        },

        async mod() {
            this.$router.push('/mod')
        },

        async profile() {
            this.$router.push('/profile')
        },

        open() {
            this.$emit('openMenu')
        },

    },
    created: async function () {
        this.showMenu = false

        /* Validate magic login. */
        this.isLoggedIn = await magicKey.user.isLoggedIn()
            .catch(err => console.error(err))
        console.log('MAGIC (isLoggedIn):', this.isLoggedIn)

        /* Request magic user data. */
        this.magicUser = await magicKey.user.getMetadata()
            .catch(err => console.error(err))
        console.log('MAGIC (user):', this.magicUser)

        this.gravatarUrl = gravatar.url(this.magicUser.email)
        console.log('GRAVATAR (url):', this.gravatarUrl)
    },
    mounted: function () {
        //
    },
}
</script>
