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
                        <div class="absolute top-0 left-0 pt-3 pl-3">
                            <button @click="report" type="button" class="flex items-center bg-white rounded-md text-xs text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Report</span>
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                                REPORT
                            </button>
                        </div>

                        <div class="absolute top-0 right-0 pt-3 pr-3">
                            <button @click="close" type="button" class="flex items-center bg-white rounded-md text-xs text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Close details</span>
                                CLOSE
                                <svg class="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="sm:flex sm:items-start">
                            <div class="sm:mt-8 h-12 w-12 mx-auto flex-shrink-0 flex items-center justify-center border-2 border-gray-800 rounded-full bg-gray-600 shadow-md">
                                <font-awesome-icon :icon="icon" class="w-8 h-8 text-gray-200" />
                            </div>

                            <div class="mt-3 text-center sm:mt-2 sm:ml-4 sm:text-left">
                                <h1 class="text-2xl sm:text-3xl leading-7 font-medium text-gray-900" id="modal-title">
                                    {{name}}

                                    <h3 class="block text-sm text-gray-400 uppercase">
                                        {{category === '' || category === 'default' ? 'Merchant' : category}}
                                    </h3>
                                </h1>

                                <section class="mt-3 w-full">
                                    <div class="grid grid-cols-5 gap-4 rounded-xl">
                                        <div class="col-span-3">
                                            <img
                                                class="p-1 border-2 border-gray-300 shadow-md shadow-inner rounded"
                                                :src="banner"
                                            />

                                            <div class="mt-2 pl-3">
                                                <span class="text-xs text-gray-500 font-medium uppercase">
                                                    Now Accepting
                                                </span>

                                                <div class="flex flex-row gap-2 justify-center sm:justify-start">
                                                    <cryptoicon
                                                        v-if="accepting.includes('BCH')"
                                                        symbol="bch"
                                                        size="24"
                                                    />

                                                    <cryptoicon
                                                        v-if="accepting.includes('BTC')"
                                                        symbol="btc"
                                                        size="24"
                                                    />

                                                    <cryptoicon
                                                        v-if="accepting.includes('ETH')"
                                                        symbol="eth"
                                                        size="24"
                                                    />

                                                    <cryptoicon
                                                        v-if="accepting.includes('DASH')"
                                                        symbol="dash"
                                                        size="24"
                                                    />
                                                </div>
                                            </div>

                                            <div class="mt-2 pt-1 pl-3 border-t border-gray-200">
                                                <span class="text-xs text-gray-500 font-medium uppercase">
                                                    Last <strong class="text-green-600">Bitcoin</strong> Activity
                                                </span>

                                                <h3 class="text-sm text-gray-700 font-medium">
                                                    {{lastActivity}}
                                                </h3>
                                            </div>
                                        </div>

                                        <div class="col-span-2">
                                            <a @click="directions" href="javascript://"  class="mt-3 leading-3 text-blue-500 text-center hover:underline font-extrabold">
                                                {{streetAddress}}
                                                 —
                                                {{location}}
                                            </a>

                                            <div class="mt-1 pt-2 text-xs border-t border-gray-200">
                                                {{summary}}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </section>

                    <footer class="p-4 sm:flex sm:flex-row-reverse sm:justify-around sm:bg-gradient-to-r from-gray-300 to-gray-100 sm:border-t-2 sm:border-gray-400 sm:shadow-inner">
                        <button
                            @click="directions"
                            class="px-4 py-2 w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <!-- <font-awesome-icon icon="fa-solid fa-route" class="w-5 h-5 text-gray-100" /> -->
                            <font-awesome-icon icon="fa-solid fa-compass" class="w-5 h-5 text-gray-100" />

                            <span class="ml-3 text-2xl sm:text-xl font-medium text-gray-100">
                                Directions
                            </span>
                        </button>

                        <a
                            v-if="phone"
                            :href="'tel:' + phone"
                            class="sm:mt-0 sm:w-auto mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"></path><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>

                            <span class="ml-3 text-2xl sm:text-xl font-medium text-gray-700">
                                Call
                            </span>
                        </a>

                        <a
                            v-if="website"
                            :href="website" target="_blank"
                            class="sm:mt-0 sm:w-auto mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>

                            <span class="ml-3 text-2xl sm:text-xl font-medium text-gray-700">
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
        crypto: null,
        lat: null,
        lng: null,
        lastActivity: null,
    }),
    computed: {
        banner() {
            if (this.media && this.media.storefront) {
                return this.media.storefront
            }

            return 'https://i.imgur.com/q3MT9Nh.png'
        },

        icon() {
            if (this.category === 'atm') {
                return `fa-solid fa-piggy-bank`
            }

            if (this.category === 'attraction') {
                return `fa-solid fa-map-location-dot`
            }

            if (this.category === 'cafe') {
                return `fa-solid fa-mug-saucer`
            }

            if (this.category === 'food') {
                return `fa-solid fa-utensils`
            }

            if (this.category === 'grocery') {
                return `fa-solid fa-basket-shopping`
            }

            if (this.category === 'lodging') {
                return `fa-solid fa-bed`
            }

            if (this.category === 'nightlife') {
                return `fa-solid fa-champagne-glasses`
            }

            if (this.category === 'services') {
                return `fa-solid fa-bell-concierge`
            }

            if (this.category === 'shopping') {
                return `fa-solid fa-bag-shopping`
            }

            if (this.category === 'sports') {
                return `fa-solid fa-person-running`
            }

            if (this.category === 'transport') {
                return `fa-solid fa-truck-plane`
            }

            return `fa-solid fa-store`
        },

        location() {
            if (!this.city || !this.state || !this.postalCode) {
                return 'n/a'
            }

            return `${this.city}, ${this.state} ${this.postalCode}`
        },

        summary() {
            if (!this.description) {
                return `no summary available`
            }

            return this.description
        },

        accepting() {
            let coins = []

            if (this.crypto && this.crypto['BCH']) {
                coins.push('BCH')
            }

            if (this.crypto && this.crypto['BTC']) {
                coins.push('BTC')
            }

            if (this.crypto && this.crypto['ETH']) {
                coins.push('ETH')
            }

            if (this.crypto && this.crypto['DASH']) {
                coins.push('DASH')
            }

            if (coins.length === 0) {
                coins.push('BCH')
            }

            return coins
        }

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
            const address = 'hello@usecash.com'
            const subject = 'Use Cash: Merchant Report'

            let body = '\n\n'

            body += '________________________________________'
            body += '\nPlease enter the report details above ☝\n\n'

            if (this.name) {
                body += 'Merchant Name: ' + this.name + '\n'
            }

            if (this.streetAddress) {
                body += 'Street Address: ' + this.streetAddress + '\n'
            }

            if (this.city) {
                body += 'City: ' + this.city + '\n'
            }

            if (this.state) {
                body += 'State: ' + this.state + '\n'
            }

            if (this.postalCode) {
                body += 'Postal Code: ' + this.postalCode + '\n'
            }

            if (this.country) {
                body += 'Country: ' + this.country + '\n'
            }

            window.open(`mailto:${address}?subject=${subject}&body=${encodeURIComponent(body)}`)
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

            /* Handle crypto. */
            if (body.crypto) {
                this.crypto = body.crypto
            }

            /* Handle latitude. */
            if (body.lat) {
                this.lat = body.lat
            }

            /* Handle longitude. */
            if (body.lng) {
                this.lng = body.lng
            }

            /* Handle longitude. */
            if (body.updatedAt) {
                this.lastActivity = body.updatedAt
            } else {
                this.lastActivity = `not available`
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
