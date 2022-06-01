<template>
    <main class="">
        <section class="sm:hidden">
            <div class="bg-red-50 border-l-4 border-red-400 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>

                    <div class="ml-3">
                        <p class="text-lg text-red-700">
                            Moderation Mode is currently ONLY available in Desktop View
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="hidden sm:flex h-screen overflow-hidden">
            <Menu
                :isOpen="isOpen"
                :isMenuOpen="isMenuOpen"
                @close="close"
            />

            <router-view
                class="pl-5"
                :magicUser="magicUser"
                :isMenuOpen="isMenuOpen"
            />
        </section>
    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
import Menu from '@/components/mod/Menu'

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default {
    props: {
        magicUser: Object,
    },
    components: {
        Menu,
    },
    data: () => ({
        isOpen: null,
        isLoggedIn: null,
        isMenuOpen: null,
    }),
    methods: {
        /**
         * Complete
         */
        complete() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },

        open() {
            this.isOpen = true
        },

        close() {
            this.isOpen = false
            this.$emit('closeMenu')
        },

    },
    async beforeRouteEnter(to, from, next) {
        /* Validate magic login. */
        const isLoggedIn = await magicKey.user.isLoggedIn()
            .catch(err => console.error(err))
        console.log('MAGIC (isLoggedIn):', isLoggedIn)

        /* Validate user login. */
        if (isLoggedIn) {
            next()
        } else {
            next('/')
        }
    },
    created: async function () {
        /* Validate magic login. */
        // this.isLoggedIn = await magicKey.user.isLoggedIn()
        //     .catch(err => console.error(err))
        // console.log('MAGIC (isLoggedIn):', this.isLoggedIn)

        /* Request magic user data. */
        // this.magicUser = await magicKey.user.getMetadata()
        //     .catch(err => console.error(err))
        // console.log('MAGIC (user):', this.magicUser)

        /* Initialize menu state. */
        this.isOpen = false

        // const route = this.$route
        // console.log('ROUTE', route)

        // if (route && route.params) {
        //     const params = route.params
        //     console.log('PARAMS', params)
        //
        //     if (params && params.pageid) {
        //         const pageid = params.pageid
        //         console.log('PAGE ID', pageid)
        //     }
        // }
    },
    mounted: function () {
        //
    },
}
</script>
