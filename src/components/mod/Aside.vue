<template>
    <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200">
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div v-html="content" />

            <section v-if="!content" aria-labelledby="announcements-title">
                <h2 class="text-base font-medium text-gray-900" id="announcements-title">Announcements</h2>

                <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="#" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        Office closed on July 2nd
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.
                                </p>
                            </div>
                        </li>

                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="#" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        New password policy
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus
                                    rerum. Culpa cum vel natus. Est sit autem mollitia.
                                </p>
                            </div>
                        </li>

                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="#" class="hover:underline focus:outline-none">
                                        <!-- Extend touch target to entire panel -->
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        Office closed on July 2nd
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab
                                    dicta et. Consequatur quis dignissimos voluptatem nisi.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <button
                v-if="content"
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
