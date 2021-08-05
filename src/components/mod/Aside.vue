<template>
    <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200">
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div v-html="content" />

            <button
                @click="openHelp"
                type="button"
                class="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
                Open help
            </button>
        </div>
    </aside>
</template>

<script>
export default {
    data: () => ({
        content: null,
    }),
    watch: {
        $route(to, from) {
            console.log('$ROUTE HAS CHANGED', to, from);

            const path = to.path

            switch(path) {
            case '/mod/search':
                this.load('search')
                break
            default:
                this.load()
            }
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     console.log('BEFORE ROUTE ENTER (aside)', to, from)
    //
    //
    //     next()
    // },
    beforeRouteUpdate (to, from, next) {
        console.log('BEFORE ROUTE UPDATE (aside)', to, from)
        alert(to)


        next()
    },
    methods: {
        load(_page) {
            if (_page === 'search') {
                this.content = `Let's start by showing you some SEARCH help..`
            } else {
                this.content = `NO CONTEXT HELP AVAILABLE`
            }
        },

        openHelp() {
            this.$router.push('/help')
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
