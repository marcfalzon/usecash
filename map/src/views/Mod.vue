<template>
    <main class="max-5-5xl mx-auto px-3">

        <div class="h-screen flex overflow-hidden bg-white">
            <Menu
                :isOpen="isOpen"
                :isMenuOpen="isMenuOpen"
                @close="close"
            />

            <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
                <div class="flex-1 relative z-0 flex overflow-hidden">
                    <router-view
                        :magicUser="magicUser"
                        :isMenuOpen="isMenuOpen"
                    ></router-view>

                    <Aside :isMenuOpen="isMenuOpen" />
                </div>

            </div>
        </div>


    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
import Aside from '@/components/mod/Aside'
import Menu from '@/components/mod/Menu'

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default {
    props: {
        isMenuOpen: Boolean,
    },
    components: {
        Aside,
        // Dashboard,
        Menu,
    },
    data: () => ({
        isOpen: null,
        isLoggedIn: null,
        magicUser: null,
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
        this.isLoggedIn = await magicKey.user.isLoggedIn()
            .catch(err => console.error(err))
        console.log('MAGIC (isLoggedIn):', this.isLoggedIn)

        /* Request magic user data. */
        this.magicUser = await magicKey.user.getMetadata()
            .catch(err => console.error(err))
        console.log('MAGIC (user):', this.magicUser)

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
