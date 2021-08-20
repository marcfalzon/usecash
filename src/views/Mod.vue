<template>
    <main class="mod-container">

        <div class="h-screen flex overflow-hidden bg-white">
            <Menu :isOpen="isOpen" :isMenuOpen="isMenuOpen" @close="close" />

            <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
                <!-- <div class="lg:hidden">
                    <div class="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                        <div>
                            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        </div>

                        <div>
                            <button @click="open" type="button" class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> -->

                <div class="flex-1 relative z-0 flex overflow-hidden">
                    <router-view :isMenuOpen="isMenuOpen"></router-view>

                    <Aside :isMenuOpen="isMenuOpen" />
                </div>

            </div>
        </div>


    </main>
</template>

<script>
/* Import components. */
import Aside from '@/components/mod/Aside'
// import Dashboard from '@/components/mod/Dashboard'
import Menu from '@/components/mod/Menu'

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
        // isOpen: null,

        // loading: false,
        // selection: 1,
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
            // this.isOpen = true
        },

        close() {
            // this.isOpen = false
            this.$emit('closeMenu')
        },

    },
    created: function () {
        /* Initialize menu state. */
        this.isOpen = false

        const route = this.$route
        console.log('ROUTE', route)

        if (route && route.params) {
            const params = route.params
            console.log('PARAMS', params)

            if (params && params.pageid) {
                const pageid = params.pageid
                console.log('PAGE ID', pageid)
            }
        }
    },
    mounted: function () {

    },
}
</script>

<style scoped>
.mod-container {
    width: 100%;
}

.description {
    padding: 0 300px 0 30px;
}
</style>
