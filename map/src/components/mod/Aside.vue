<template>
    <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200">
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div v-html="content" />

            <aside v-if="pageid === 'issues'" class="">
                <h2 class="sr-only">Issues</h2>

                <div class="space-y-5">
                    <div class="flex items-center space-x-2">
                        <!-- Heroicon name: solid/lock-open -->
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                        </svg>
                        <span class="text-green-700 text-sm font-medium">Open Issue</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <!-- Heroicon name: solid/chat-alt -->
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-900 text-sm font-medium">4 comments</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <!-- Heroicon name: solid/calendar -->
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-900 text-sm font-medium">Created on <time datetime="2020-12-02">Dec 2, 2020</time></span>
                    </div>
                </div>
                <div class="mt-6 border-t border-gray-200 py-6 space-y-8">
                    <div>
                        <h2 class="text-sm font-medium text-gray-500">Assignees</h2>
                        <ul class="mt-3 space-y-3">
                            <li class="flex justify-start">
                                <a href="javascript://" class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <img class="h-5 w-5 rounded-full" src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" />
                                    </div>
                                    <div class="text-sm font-medium text-gray-900">Eduardo Benz</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="text-sm font-medium text-gray-500">Tags</h2>
                        <ul class="mt-2 leading-8">
                            <li class="inline">
                                <a href="javascript://" class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 text-sm font-medium text-gray-900">Bug</div>
                                </a>
                            </li>
                            <li class="inline">
                                <a href="javascript://" class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5">
                                    <div class="absolute flex-shrink-0 flex items-center justify-center">
                                        <span class="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true"></span>
                                    </div>
                                    <div class="ml-3.5 text-sm font-medium text-gray-900">Accessibility</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            <section v-if="!pageid" aria-labelledby="announcements-title">
                <h2 class="text-base font-medium text-gray-900" id="announcements-title">Announcements</h2>

                <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                        <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="javascript://" class="hover:underline focus:outline-none">
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
                                    <a href="javascript://" class="hover:underline focus:outline-none">
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

                        <!-- <li class="py-5">
                            <div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    <a href="javascript://" class="hover:underline focus:outline-none">
                                        <span class="absolute inset-0" aria-hidden="true"></span>
                                        Office closed on July 2nd
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                                    Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab
                                    dicta et. Consequatur quis dignissimos voluptatem nisi.
                                </p>
                            </div>
                        </li> -->

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
    props: {
        isMenuOpen: Boolean,
    },
    data: () => ({
        content: null,
        pageid: null,
    }),
    watch: {
        $route(to, from) {
            console.log('$ROUTE HAS CHANGED', to, from);

            this.pageid = null
            this.content = null

            const path = to.path

            switch(path) {
            case '/mod/issues':
                this.pageid = 'issues'
                // this.load('issues')
                break
            case '/mod/search':
                this.pageid = 'search'
                // this.load('search')
                break
            default:
                // this.load()
                this.pageid = null
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
        // load(_page) {
        //     console.log('PAGE', _page)
        //     // if (_page === 'search') {
        //     //     this.content = null
        //     // } else if (_page === 'issues') {
        //     //     this.content = null
        //     // } else {
        //     //     this.content = `NO CONTEXT HELP AVAILABLE`
        //     // }
        // },

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
