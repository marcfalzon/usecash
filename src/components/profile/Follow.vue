<template>
    <main aria-labelledby="who-to-follow-heading" class="mt-5">
        <div class="bg-white rounded-lg shadow">
            <div class="p-6">
                <h2 id="who-to-follow-heading" class="text-base font-medium text-gray-900">
                    Who to follow
                </h2>
                <div class="mt-6 flow-root">
                    <ul class="-my-4 divide-y divide-gray-200">
                        <li class="flex items-center py-4 space-x-3">
                            <div class="flex-shrink-0">
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <p class="text-sm font-medium text-gray-900">
                                    <a href="#">Leonard Krasner</a>
                                </p>
                                <p class="text-sm text-gray-500">
                                    <a href="#">@leonardkrasner</a>
                                </p>
                            </div>
                            <div class="flex-shrink-0">
                                <button type="button" class="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-sm font-medium text-red-700 hover:bg-red-100">
                                    <!-- Heroicon name: solid/plus -->
                                    <svg class="-ml-1 mr-0.5 h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        Follow
                                    </span>
                                </button>
                            </div>
                        </li>

                        <!-- More people... -->
                    </ul>
                </div>
                <div class="mt-6">
                    <a href="#" class="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View all
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    methods: {
        //
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
