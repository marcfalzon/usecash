<template>
    <main class="py-10">
        <!-- Page header -->
        <div class="flex flex-col max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
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
                    <p class="text-sm font-medium text-gray-500">User for 1 year</p>
                    <p class="text-sm font-medium text-gray-500">Last online 1 day ago <a href="javascript://">(show activity)</a></p>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                <!-- Description lismax-w-3xl mx-auto sm:px-6 lg:max-w-7xlt-->
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
                            <dl class="flex flex-col gap-4">
                                <div class="sm:mt-0 sm:col-span-1">
                                    <dt class="text-lg font-medium text-gray-500">
                                        Twitter
                                    </dt>

                                    <dd class="mt-1 text-sm text-gray-900">
                                        <a :href="'https://twitter.com/' + displayTwitter" target="_blank">{{displayTwitter}}</a>
                                    </dd>
                                </div>

                                <div class="mt-3 sm:mt-0 sm:col-span-2">
                                    <dt class="text-lg font-medium text-gray-500">
                                        About me
                                    </dt>

                                    <dd class="mt-1 text-sm text-gray-900">
                                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident.
                                    </dd>
                                </div>

                                <div class="mt-3 sm:mt-0 relative sm:col-span-3">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-300"></div>
                                    </div>

                                    <div class="relative flex justify-center">
                                        <span class="px-2 bg-white text-sm text-gray-500">
                                            My currencies
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-3 sm:mt-0 sm:col-span-2">
                                    <div class="grid grid-cols-3 gap-6">
                                        <div class="col-span-3 sm:col-span-2">
                                            <label for="company-website" class="block text-sm font-medium text-gray-700">
                                                Bitcoin Cash Address
                                            </label>
                                            <div class="mt-1 flex rounded-md shadow-sm">
                                                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                    bitcoincash:
                                                </span>
                                                <input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="qqfc3lxxylme0w87c5j2wdmsqln6e844xcmsdssvzy">
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="mt-3 sm:mt-0 col-span-6 sm:col-span-3">
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

                                <div class="mt-3 relative sm:col-span-3">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div class="relative flex justify-center">
                                        <span class="px-2 bg-white text-sm text-gray-500">
                                            My favorite links
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-3 sm:mt-0 sm:col-span-2">
                                    <dd class="mt-1 text-sm text-gray-900">
                                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div class="w-0 flex-1 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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

                                <div class="mt-3 sm:mt-0 col-span-6 sm:col-span-3">
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

                        <Onboarding :profile="profile" />
                    </div>
                </section>

                <!-- <Comments /> -->
            </div>

            <div class="lg:col-span-2">
                <ActivityFeed />

                <!-- <Follow /> -->
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
// import moment from 'moment'

/* Import components. */
import ActivityFeed from '@/components/profile/ActivityFeed'
// import Comments from '@/components/profile/Comments'
// import Follow from '@/components/profile/Follow'
import Onboarding from '@/components/profile/Onboarding'

export default {
    props: {
        hasAuth: Boolean,
        profile: Object,
    },
    components: {
        ActivityFeed,
        // Comments,
        // Follow,
        Onboarding,
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
