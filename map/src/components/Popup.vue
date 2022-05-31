<template>
    <main class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"></div>

        <div @click="close" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
                <div @click.stop="noop" class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <section @click.stop="noop" class="px-4 pt-5 pb-4 sm:p-6">
                        <div class="absolute top-0 right-0 pt-3 pr-3">
                            <button @click="report" type="button" class="flex items-center bg-white rounded-md text-xs text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Report</span>
                                REPORT
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                            </button>
                        </div>

                        <div class="sm:flex sm:items-start">
                            <div class="h-12 w-12 mx-auto flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-200">
                                <!-- <div v-html="icon" /> -->
                                <font-awesome-icon :icon="icon" class="w-8 h-8 text-yellow-600" />
                            </div>

                            <div class="mt-3 text-center sm:mt-1 sm:ml-4 sm:text-left">
                                <h1 class="text-2xl sm:text-3xl leading-7 font-medium text-gray-900" id="modal-title">
                                    {{name}}

                                    <h3 class="block text-sm text-gray-400 uppercase">
                                        {{category}}
                                    </h3>
                                </h1>

                                <section class="mt-3 w-full">
                                    <div class="grid grid-cols-5 gap-4 rounded-xl">
                                        <div class="col-span-3">
                                            <img class="p-1 border-2 border-gray-300 rounded" :src="banner" />

                                            <div class="mt-1 pl-2 text-xs">
                                                {{description}}
                                            </div>
                                        </div>

                                        <div class="col-span-2">
                                            <p class="text-right">
                                                <a class="mt-3 leading-3 text-blue-500 text-right hover:underline font-extrabold" href="https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=123 Main Street<br>New York, NY 10012<br>" target="_blank">
                                                    {{streetAddress}}
                                                    <span class="block">{{location}}</span>
                                                </a>
                                            </p>

                                            <p class="mt-2 text-right">
                                                <strong>ACCEPTING</strong>
                                                <br />BCH, BTC, DASH
                                            </p>

                                            <div class="mt-2 text-right">
                                                Last <strong>BITCOIN</strong> Transaction
                                                <h2>an hour ago <small></small></h2>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </section>

                    <footer class="mt-5 sm:mt-4 p-4 sm:flex sm:flex-row-reverse sm:justify-around sm:bg-gray-200 sm:border-t-2 sm:border-gray-300 sm:shadow-inner">
                        <button
                            @click="directions"
                            class="px-4 py-2 w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <svg class="w-5 h-5 text-gray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>

                            <span class="ml-3 text-xl sm:text-lg font-medium text-gray-100">
                                Directions
                            </span>
                        </button>

                        <a
                            v-if="phone"
                            :href="'tel:' + phone"
                            class="sm:mt-0 sm:w-auto mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"></path><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>

                            <span class="ml-3 text-xl sm:text-lg font-medium text-gray-700">
                                Call
                            </span>
                        </a>

                        <a
                            v-if="website"
                            :href="website" target="_blank"
                            class="sm:mt-0 sm:w-auto mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>

                            <span class="ml-3 text-xl sm:text-lg font-medium text-gray-700">
                                Visit Website
                            </span>
                        </a>
                    </footer>
                </div>

            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import superagent from 'superagent'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    props: {
        vendorid: String,
    },
    data: () => ({
        name: null,
        category: null,
        media: null,
        streetAddress: null,
        city: null,
        state: null,
        postalCode: null,
        phone: null,
        website: null,
        description: null,
        lat: null,
        lng: null,
    }),
    computed: {
        banner() {
            if (this.media && this.media.storefront) {
                return this.media.storefront
            }

            return 'https://i.imgur.com/q3MT9Nh.png'
        },

        icon() {
            // return `fa-solid fa-map-location-dot`
            return `fa-brands fa-twitter`
            // return `<font-awesome-icon icon="fa-solid fa-map-location-dot" class="w-8 h-8 text-yellow-600" />`
        },

        location() {
            if (!this.city || !this.state || !this.postalCode) {
                return 'n/a'
            }

            return `${this.city}, ${this.state} ${this.postalCode}`
        },

        // geo() {
        //     if (!this.lat || !this.lng) {
        //         return null
        //     }
        //
        //     return `geo:${this.lat},${this.lng}`
        // },

    },
    methods: {
        close() {
            this.$emit('close')
        },

        noop() {
            //
        },

        doSomething() {
            alert('doing something')
        },

        report() {
            alert('send email report')
        },

        directions() {
            if (
                (navigator.platform.indexOf('iPhone') != -1)
                || (navigator.platform.indexOf('iPad') != -1)
                || (navigator.platform.indexOf('iPod') != -1)
            ) {
                window.open(`maps://maps.google.com/maps?daddr=${this.lat},${this.lng}&amp;ll=`)
            } else { /* else use Google */
                window.open(`https://maps.google.com/maps?daddr=${this.lat},${this.lng}&amp;ll=`)
            }
        },

    },
    created: async function () {
        const result = await superagent
            .get(`${API_ENDPOINT}/merchants/${this.vendorid}`)
            .catch(err => console.error(err))
        // console.log('POPUP VENDOR (result):', result)

        if (result && result.body) {
            const body = result.body
            console.log('POPUP BODY', body)

            /* Handle merchant name. */
            if (body.name) {
                this.name = body.name
            }

            /* Handle category. */
            if (body.category) {
                this.category = body.category
            }

            /* Handle media. */
            if (body.media) {
                this.media = body.media
            }

            /* Handle street address. */
            if (body.streetAddress) {
                this.streetAddress = body.streetAddress
            }

            /* Handle city. */
            if (body.city) {
                this.city = body.city
            }

            /* Handle state. */
            if (body.state) {
                this.state = body.state
            }

            /* Handle postal code. */
            if (body.postalCode) {
                this.postalCode = body.postalCode
            }

            /* Handle phone number. */
            if (body.phone) {
                this.phone = body.phone
            }

            /* Handle website. */
            if (body.website) {
                this.website = body.website
            }

            /* Handle description. */
            if (body.description) {
                this.description = body.description
            }

            /* Handle latitude. */
            if (body.lat) {
                this.lat = body.lat
            }

            /* Handle longitude. */
            if (body.lng) {
                this.lng = body.lng
            }

        }

    },
    mounted: function () {
        //
    },
    beforeDestroy: function () {
        console.log('TODO: DO POPUP CLEANUP!')
    },
}
</script>
