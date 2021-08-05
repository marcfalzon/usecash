<template>
    <main class="py-10">
        <!-- Page header -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img class="h-16 w-16 rounded-full" :src="avatar" alt="" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{displayName}}</h1>
                    <!-- <p class="text-sm font-medium text-gray-500">Applied for <a href="javascript://" class="text-gray-900">Front End Developer</a> on <time datetime="2020-08-25">August 25, 2020</time></p> -->
                    <p class="text-sm font-medium text-gray-500">User for 1 year | Last online 1 day ago <a href="javascript://">(show activity)</a></p>
                </div>
            </div>
            <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <button
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-black bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                    Send tip ($)
                </button>
                <button
                    type="button"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                    Follow (+)
                </button>
            </div>
        </div>

        <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                <!-- Description list-->
                <section aria-labelledby="applicant-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <!-- <div class="px-4 py-5 sm:px-6">
                            <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                                Applicant Information
                            </h2>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                Personal details and application.
                            </p>
                        </div> -->

                        <!-- <div class="border-t border-gray-200 px-4 py-5 sm:px-6"> -->
                        <div class="px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Application for
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        Backend Developer
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Email address
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{displayEmail}}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Salary expectation
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        $120,000
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Twitter
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <a :href="'https://twitter.com/' + displayTwitter" target="_blank">{{displayTwitter}}</a>
                                    </dd>
                                </div>
                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">
                                        About me
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                                        nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                    </dd>
                                </div>

                                <div class="sm:col-span-3">
                                    <hr />
                                </div>

                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">
                                        My currencies
                                    </dt>

                                    <dd class="mt-1 text-sm text-gray-900">
                                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <!-- Heroicon name: solid/paper-clip -->
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span class="ml-2 flex-1 w-0 truncate">
                                                        Bitcoin Cash (BCH)
                                                    </span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a href="javascript://" class="font-medium text-blue-600 hover:text-blue-500">
                                                        Open wallet
                                                    </a>
                                                </div>
                                            </li>

                                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <!-- Heroicon name: solid/paper-clip -->
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span class="ml-2 flex-1 w-0 truncate">
                                                        Dash (DASH)
                                                    </span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a href="javascript://" class="font-medium text-blue-600 hover:text-blue-500">
                                                        Open wallet
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium text-gray-700">Add a new currency</label>
                                    <select
                                        id="currency"
                                        name="currency"
                                        autocomplete="currency"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option>Bitcoin</option>
                                        <option selected>Bitcoin Cash</option>
                                        <option>Bitcoin SV</option>
                                        <option>Dash</option>
                                        <option>Dogecoin</option>
                                        <option>Ethereum</option>
                                        <option>Litecoin</option>
                                        <option>Monero</option>
                                        <option>Ripple</option>
                                        <option>Tether</option>
                                        <option>Custom</option>
                                    </select>
                                </div>

                                <div class="sm:col-span-3">
                                    <hr />
                                </div>

                                <div class="sm:col-span-2">
                                    <dt class="text-sm font-medium text-gray-500">
                                        My links
                                    </dt>

                                    <dd class="mt-1 text-sm text-gray-900">
                                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <!-- Heroicon name: solid/paper-clip -->
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span class="ml-2 flex-1 w-0 truncate">
                                                        Website
                                                    </span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a href="javascript://" class="font-medium text-blue-600 hover:text-blue-500">
                                                        https://my-cool-website.com
                                                    </a>
                                                </div>
                                            </li>

                                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <!-- Heroicon name: solid/paper-clip -->
                                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                    <span class="ml-2 flex-1 w-0 truncate">
                                                        YouTube
                                                    </span>
                                                </div>
                                                <div class="ml-4 flex-shrink-0">
                                                    <a href="javascript://" class="font-medium text-blue-600 hover:text-blue-500">
                                                        https://youtu.be/a4Ga32y
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </dd>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium text-gray-700">Add a new link</label>
                                    <select
                                        id="social-links"
                                        name="social-links"
                                        autocomplete="social-links"
                                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option>Apple podcasts</option>
                                        <option>BitChute</option>
                                        <option>BitTube</option>
                                        <option>Cash App</option>
                                        <option>Discord</option>
                                        <option>DLive</option>
                                        <option>Facebook</option>
                                        <option>Flote.app</option>
                                        <option>GitHub</option>
                                        <option>Instagram</option>
                                        <option>LinkedIn</option>
                                        <option>LBRY</option>
                                        <option>Medium</option>
                                        <option>Memo.Cash</option>
                                        <option>Minds</option>
                                        <option>Patreon</option>
                                        <option>PayPal</option>
                                        <option>Read.Cash</option>
                                        <option>Reddit</option>
                                        <option>Soundcloud</option>
                                        <option>Steemit</option>
                                        <option>Spotify</option>
                                        <option>Stitcher</option>
                                        <option>TikTok</option>
                                        <option>Twetch</option>
                                        <option>Telegram</option>
                                        <option>Twitch</option>
                                        <option>Twitter</option>
                                        <option>Website</option>
                                        <option>YouTube</option>
                                        <option>Custom</option>
                                    </select>
                                </div>

                            </dl>
                        </div>

                        <!-- <div>
                            <a href="javascript://" class="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">Read full application</a>
                        </div> -->
                    </div>
                </section>

                <Comments />
            </div>

            <ActivityFeed />
        </div>
    </main>
</template>

<script>
/* Import modules. */
// import moment from 'moment'

/* Import components. */
import ActivityFeed from '@/components/profile/ActivityFeed'
import Comments from '@/components/profile/Comments'

export default {
    props: {
        hasAuth: Boolean,
        profile: Object,
    },
    components: {
        ActivityFeed,
        Comments,
    },
    computed: {
        displayName() {
            if (this.profile && this.profile.name) {
                return `${this.profile.name} (@${this.profile.id})`
            }

            return 'Unknown user'
        },

        displayEmail() {
            // TODO: show/hide based on account permissions
            if (!this.hasAuth === true) {
                return '********'
            }

            if (this.profile && this.profile.email) {
                return this.profile.email
            }

            return 'email@unknown'
        },

        displayTwitter() {
            if (this.profile && this.profile.twitter) {
                return `@${this.profile.twitter}`
            }

            return 'n/a'
        },

        avatar() {
            if (this.profile && this.profile.avatar) {
                return this.profile.avatar
            } else {
                return 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
            }
        },
    },
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
