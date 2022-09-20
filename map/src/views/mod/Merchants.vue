<template>
    <main class="">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
                Merchants
            </h1>

            <p class="mt-1 text-sm text-gray-500">
                List of all the merchant profiles
            </p>
        </div>

        <div class="mt-3">
            <label for="username" class="ml-1 block text-xs font-medium text-gray-500 uppercase">
                Search for a merchant
            </label>

            <input
                class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-1/2 rounded-md sm:text-sm border-gray-300"
                type="text"
                v-model="searchTerm"
                @keyup="activeMerchant = null"
                @focus="activeMerchant = null"
                placeholder="Search by name, location or type."
            />

            <p class="mt-2 ml-2 text-xs text-gray-500">
                NOTE: Not all search terms will apply to all merchants.
            </p>
        </div>

        <section v-if="activeMerchant" class="mt-3 mr-2 ml-20 p-3 border-2 border-yellow-300 bg-yellow-100 rounded-lg">
            <div class="float-right mt-3 flex flex-col text-xs text-yellow-800">
                <span>
                    Lat: <strong>{{activeMerchant.lat.toFixed(6)}}</strong>
                </span>

                <span>
                    Lng: <strong>{{activeMerchant.lng.toFixed(6)}}</strong>
                </span>
            </div>

            <h1 class="text-2xl">{{activeMerchant.name}}</h1>
            <span class="-mt-1 block text-yellow-800 text-xs uppercase">
                {{activeMerchant.category}}
            </span>

            <div class="mt-3 text-sm">
                <input
                    class="w-1/2 text-sm rounded-lg"
                    type="text"
                    v-model="activeMerchant.city"
                    placeholder="City"
                />
            </div>

            <div class="mt-3 text-sm">
                <span class="block ml-2 text-xs text-yellow-800 uppercase">
                    👇 Enter Reporting ID into <a class="text-blue-500 font-medium hover:underline" href="https://pos.cash" target="_blank">POS.cash</a> 👇
                </span>

                <input
                    class="w-3/4 text-sm rounded-lg"
                    type="text"
                    :value="activeMerchant.id"
                    disabled
                />
            </div>

            <div class="mt-2 flex justify-end">
                <button
                    class="py-1 px-3 bg-blue-500 border-2 border-blue-700 text-blue-50 font-medium rounded-md hover:bg-blue-400"
                    @click="updateMerchant"
                >
                    Update Merchant
                </button>
            </div>
        </section>

        <div class="my-3 -mx-6">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                <div class="shadow overflow-x-visible border-b border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <!-- <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">

                            <tr
                                class="cursor-pointer"
                                v-for="merchant of filtered" :key="merchant.id"
                                @click="showDetails(merchant.id)"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img
                                                class="h-10 w-10 rounded-full"
                                                :src="thumbnail(merchant)"
                                                alt=""
                                            />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{merchant.name}}
                                            </div>
                                            <div class="text-sm text-gray-500 uppercase">
                                                {{merchant.category}}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{merchant.streetAddress}}</div>
                                    <div class="text-sm text-gray-500">{{merchant.city}} {{merchant.state}}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    Default
                                </td>
                                <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                </td> -->
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import gravatar from 'gravatar'
import superagent from 'superagent'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    data: () => ({
        activeMerchant: null,
        merchants: null,
        searchTerm: null,
    }),
    computed: {
        filtered() {
            /* Validate merchants. */
            if (!this.merchants) return []

            /* Validate search term. */
            if (!this.searchTerm) return this.merchants

            /* Handle filtering. */
            const filtered = this.merchants.filter(_merchant => {
                /* Validate merchant name. */
                if (_merchant.name.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1) {
                    return true
                }

                /* Validate merchant category. */
                if (_merchant.category.toUpperCase().indexOf(this.searchTerm.toUpperCase()) !== -1) {
                    return true
                }

                /* Return false. */
                return false
            })

            /* Return filtered. */
            return filtered
        },
    },
    methods: {
        /**
         * Initialization
         */
        async init() {
            /* Request merchants from Admin. */
            const result = await superagent
                .post(`${API_ENDPOINT}/admin/merchants`)
                .set('authorization', `Bearer ${this.didToken}`)
                // .send(merchant)
                .set('accept', 'json')
            // console.log('MERCHANTS RESULT', result)

            if (result && result.body) {
                const body = result.body
                console.log('BODY', body)

                this.merchants = body
            }
        },

        /**
         * Update Merchant
         *
         * Save merchant data changes to the database.
         */
        async updateMerchant() {
            /* Request merchants from Admin. */
            const result = await superagent
                .post(`${API_ENDPOINT}/admin/merchants`)
                .set('authorization', `Bearer ${this.didToken}`)
                .send(this.activeMerchant)
                .set('accept', 'json')
            // console.log('MERCHANTS RESULT', result)

            if (result && result.body) {
                const body = result.body
                console.log('BODY', body)

                /* Validate db update. */
                if (body.ok) {
                    alert('Merchant updated successfully!')
                } else {
                    alert('Merchant update FAILED!!')
                }
            }
        },

        /**
         * Show Details
         */
        showDetails(_merchantid) {
            // console.log('MERCHANT ID', _merchantid)

            this.activeMerchant = this.merchants.find(_merchant => {
                return _merchant.id === _merchantid
            })
        },

        /**
         * Avatar
         */
        avatar(_email) {
            return gravatar.url(_email)
        },

        thumbnail(_merchant) {
            if (!_merchant.media || !_merchant.media.storefront) {
                return 'https://i.imgur.com/CWca7ZC.png'
            }

            return _merchant.media.storefront
        }

    },
    created: function () {
        /* Initialize. */
        this.init()
    },
    mounted: function () {
        //
    },
}
</script>
