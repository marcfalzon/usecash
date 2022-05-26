<template>
    <main aria-labelledby="timeline-title" class="col-start-3 col-span-1">
        <div class="px-4 py-5 bg-yellow-50 border-2 border-yellow-200 shadow rounded-lg px-2">
            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">
                Activity Feed
            </h2>

            <section class="mt-6 flow-root">
                <ul class="">

                    <li v-for="event of events" :key="event.id">
                        <div class="relative pb-8">
                            <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            <div class="relative flex space-x-3">
                                <div>
                                    <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                        <div v-html="event.icon" />
                                    </span>
                                </div>
                                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p class="text-sm text-gray-500">
                                            {{event.description}}
                                        </p>
                                    </div>
                                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time datetime="2020-09-28">{{event.timestamp}}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

            <div class="mt-6 flex flex-col justify-stretch">
                <button
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                    Show all activity
                </button>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    props: {
        profile: Object,
    },
    data: () => ({
        events: null,
    }),
    watch: {
        profile: function (_profile) {
            if (_profile) {
                console.log('PROFILE CHANGED', _profile)
                this.init()
            }

        }
    },
    computed: {
        iconUser() {
            return `
            <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            `
        },

    },
    methods: {
        init() {
            if (this.profile && this.profile.createdAt) {
                this.events.push({
                    id: '7a903fba-79a0-42bd-a1c2-f30334d2eeb3',
                    icon: this.iconUser,
                    description: `Registered a new account @ UseCash.com`,
                    timestamp: moment.unix(this.profile.createdAt).fromNow(),
                })
            }

        },
    },
    created: function () {
        this.events = []

    },
    mounted: function () {
        //
    },
}
</script>
