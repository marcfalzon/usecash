<template>
    <main class="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <h2 class="text-sm font-medium text-gray-500">{{profile.name}} has onboarded {{profile.merchants ? profile.merchants.length : 0}} merchants over the past year</h2>
        <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>

                <div class="flex-1 min-w-0">
                    <router-link to="/@homemade-crypto" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        <p class="text-sm font-medium text-gray-900">
                            Homemade Crypto
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Co-Founder / CEO
                        </p>
                    </router-link>
                </div>
            </div>

            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div class="flex-1 min-w-0">
                    <a href="javascript://" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        <p class="text-sm font-medium text-gray-900">
                            Michael Foster
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Co-Founder / CTO
                        </p>
                    </a>
                </div>
            </div>

            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div class="flex-1 min-w-0">
                    <a href="javascript://" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        <p class="text-sm font-medium text-gray-900">
                            Dries Vincent
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Manager, Business Relations
                        </p>
                    </a>
                </div>
            </div>

            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div class="flex-1 min-w-0">
                    <a href="javascript://" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        <p class="text-sm font-medium text-gray-900">
                            Lindsay Walton
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Front-end Developer
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
// import moment from 'moment'

export default {
    props: {
        profile: Object,
    },
    computed: {
        //
    },
    data: () => ({
        //
    }),
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
