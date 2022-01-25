<template>
    <main class="px-5 lg:px-40 py-10">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 class="text-2xl leading-6 font-medium text-gray-900">
                        Add New Merchant
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

                <MapEditor id="map-editor" :startPos="startPos" @updateLoc="updateLoc" />

                <div class="px-5 lg:px-32 mt-6 grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-6">
                    <div class="lg:col-span-6">
                        <label for="cover-photo" class="block text-sm font-medium text-gray-700">
                            Merchant storefront
                        </label>

                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="space-y-1 text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>

                                <div class="flex text-sm text-gray-600">
                                    <label
                                        for="file-upload"
                                        class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                    </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>

                                <p class="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-5 lg:px-32 pt-8">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Merchant Details
                    </h3>

                    <!-- <p class="mt-1 text-sm text-gray-500">
                        NOTE: Please use a permanent address where the merchant receives mail.
                    </p> -->
                </div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-6">
                    <div class="lg:col-span-3">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">
                            Merchant name
                        </label>

                        <div class="mt-1">
                            <input type="text" v-model="merchantName" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div class="lg:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700">
                            Country / Region
                        </label>

                        <div class="mt-1">
                            <select id="country" name="country" autocomplete="country" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md">
                                <option v-for="country in countries" :key="country" :value="country">{{country}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="lg:col-span-6">
                        <label for="street-address" class="block text-sm font-medium text-gray-700">
                            Street address
                        </label>
                        <div class="mt-1">
                            <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div class="lg:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <div class="mt-1">
                            <input type="text" name="city" id="city" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div class="lg:col-span-2">
                        <label for="state" class="block text-sm font-medium text-gray-700">
                            State / Province
                        </label>
                        <div class="mt-1">
                            <input type="text" name="state" id="state" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div class="lg:col-span-2">
                        <label for="zip" class="block text-sm font-medium text-gray-700">
                            ZIP / Postal
                        </label>
                        <div class="mt-1">
                            <input type="text" name="zip" id="zip" autocomplete="postal-code" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full lg:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-5 lg:px-32 pt-8">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Notifications
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>
                </div>

                <div class="mt-6">
                    <fieldset>
                        <legend class="text-base font-medium text-gray-900">
                            By Email
                        </legend>
                        <div class="mt-4 space-y-4">
                            <div class="relative flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="comments" class="font-medium text-gray-700">Accepted</label>
                                    <p class="text-gray-500">Get notified when this merchant is approved.</p>
                                </div>
                            </div>
                            <div class="relative flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="candidates" class="font-medium text-gray-700">Activity</label>
                                    <p class="text-gray-500">Receive a monthly summary of this merchant's activity.</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>
        </div>

        <div class="px-5 lg:px-32 pt-5">
            <div class="flex justify-end">
                <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>

                <button
                    @click="addMerchant"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit New Merchant
                </button>
            </div>
        </div>
    </main>

</template>

<script>
/* Import modules. */
import superagent from 'superagent'
import { v4 as uuidv4 } from 'uuid'

/* Import components. */
import MapEditor from '@/components/MapEditor'

// const API_ENDPOINT = `https://api.use.cash/v1`
// const API_ENDPOINT = `https://usecash-api.modenero.dev/v1`
const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    components: {
        MapEditor,
    },
    data: () => ({
        lat: null,
        lng: null,
        startPos: null,

        merchantName: null,
    }),
    computed: {
        countries() {
            return [
                `Afghanistan`,
                `Åland Islands`,
                `Albania`,
                `Algeria`,
                `American Samoa`,
                `Andorra`,
                `Angola`,
                `Anguilla`,
                `Antarctica`,
                `Antigua and Barbuda`,
                `Argentina`,
                `Armenia`,
                `Aruba`,
                `Australia`,
                `Austria`,
                `Azerbaijan`,
                `Bahamas`,
                `Bahrain`,
                `Bangladesh`,
                `Barbados`,
                `Belarus`,
                `Belgium`,
                `Belize`,
                `Benin`,
                `Bermuda`,
                `Bhutan`,
                `Bolivia (Plurinational State of)`,
                `Bonaire, Sint Eustatius and Saba`,
                `Bosnia and Herzegovina`,
                `Botswana`,
                `Bouvet Island`,
                `Brazil`,
                `British Indian Ocean Territory`,
                `United States Minor Outlying Islands`,
                `Virgin Islands (British)`,
                `Virgin Islands (U.S.)`,
                `Brunei Darussalam`,
                `Bulgaria`,
                `Burkina Faso`,
                `Burundi`,
                `Cambodia`,
                `Cameroon`,
                `Canada`,
                `Cabo Verde`,
                `Cayman Islands`,
                `Central African Republic`,
                `Chad`,
                `Chile`,
                `China`,
                `Christmas Island`,
                `Cocos (Keeling) Islands`,
                `Colombia`,
                `Comoros`,
                `Congo`,
                `Congo (Democratic Republic of the)`,
                `Cook Islands`,
                `Costa Rica`,
                `Croatia`,
                `Cuba`,
                `Curaçao`,
                `Cyprus`,
                `Czech Republic`,
                `Denmark`,
                `Djibouti`,
                `Dominica`,
                `Dominican Republic`,
                `Ecuador`,
                `Egypt`,
                `El Salvador`,
                `Equatorial Guinea`,
                `Eritrea`,
                `Estonia`,
                `Ethiopia`,
                `Falkland Islands (Malvinas)`,
                `Faroe Islands`,
                `Fiji`,
                `Finland`,
                `France`,
                `French Guiana`,
                `French Polynesia`,
                `French Southern Territories`,
                `Gabon`,
                `Gambia`,
                `Georgia`,
                `Germany`,
                `Ghana`,
                `Gibraltar`,
                `Greece`,
                `Greenland`,
                `Grenada`,
                `Guadeloupe`,
                `Guam`,
                `Guatemala`,
                `Guernsey`,
                `Guinea`,
                `Guinea-Bissau`,
                `Guyana`,
                `Haiti`,
                `Heard Island and McDonald Islands`,
                `Holy See`,
                `Honduras`,
                `Hong Kong`,
                `Hungary`,
                `Iceland`,
                `India`,
                `Indonesia`,
                `Côte d'Ivoire`,
                `Iran (Islamic Republic of)`,
                `Iraq`,
                `Ireland`,
                `Isle of Man`,
                `Israel`,
                `Italy`,
                `Jamaica`,
                `Japan`,
                `Jersey`,
                `Jordan`,
                `Kazakhstan`,
                `Kenya`,
                `Kiribati`,
                `Kuwait`,
                `Kyrgyzstan`,
                `Lao People's Democratic Republic`,
                `Latvia`,
                `Lebanon`,
                `Lesotho`,
                `Liberia`,
                `Libya`,
                `Liechtenstein`,
                `Lithuania`,
                `Luxembourg`,
                `Macao`,
                `Macedonia (the former Yugoslav Republic of)`,
                `Madagascar`,
                `Malawi`,
                `Malaysia`,
                `Maldives`,
                `Mali`,
                `Malta`,
                `Marshall Islands`,
                `Martinique`,
                `Mauritania`,
                `Mauritius`,
                `Mayotte`,
                `Mexico`,
                `Micronesia (Federated States of)`,
                `Moldova (Republic of)`,
                `Monaco`,
                `Mongolia`,
                `Montenegro`,
                `Montserrat`,
                `Morocco`,
                `Mozambique`,
                `Myanmar`,
                `Namibia`,
                `Nauru`,
                `Nepal`,
                `Netherlands`,
                `New Caledonia`,
                `New Zealand`,
                `Nicaragua`,
                `Niger`,
                `Nigeria`,
                `Niue`,
                `Norfolk Island`,
                `Korea (Democratic People's Republic of)`,
                `Northern Mariana Islands`,
                `Norway`,
                `Oman`,
                `Pakistan`,
                `Palau`,
                `Palestine, State of`,
                `Panama`,
                `Papua New Guinea`,
                `Paraguay`,
                `Peru`,
                `Philippines`,
                `Pitcairn`,
                `Poland`,
                `Portugal`,
                `Puerto Rico`,
                `Qatar`,
                `Republic of Kosovo`,
                `Réunion`,
                `Romania`,
                `Russian Federation`,
                `Rwanda`,
                `Saint Barthélemy`,
                `Saint Helena, Ascension and Tristan da Cunha`,
                `Saint Kitts and Nevis`,
                `Saint Lucia`,
                `Saint Martin (French part)`,
                `Saint Pierre and Miquelon`,
                `Saint Vincent and the Grenadines`,
                `Samoa`,
                `San Marino`,
                `Sao Tome and Principe`,
                `Saudi Arabia`,
                `Senegal`,
                `Serbia`,
                `Seychelles`,
                `Sierra Leone`,
                `Singapore`,
                `Sint Maarten (Dutch part)`,
                `Slovakia`,
                `Slovenia`,
                `Solomon Islands`,
                `Somalia`,
                `South Africa`,
                `South Georgia and the South Sandwich Islands`,
                `Korea (Republic of)`,
                `South Sudan`,
                `Spain`,
                `Sri Lanka`,
                `Sudan`,
                `Suriname`,
                `Svalbard and Jan Mayen`,
                `Swaziland`,
                `Sweden`,
                `Switzerland`,
                `Syrian Arab Republic`,
                `Taiwan`,
                `Tajikistan`,
                `Tanzania, United Republic of`,
                `Thailand`,
                `Timor-Leste`,
                `Togo`,
                `Tokelau`,
                `Tonga`,
                `Trinidad and Tobago`,
                `Tunisia`,
                `Turkey`,
                `Turkmenistan`,
                `Turks and Caicos Islands`,
                `Tuvalu`,
                `Uganda`,
                `Ukraine`,
                `United Arab Emirates`,
                `United Kingdom of Great Britain and Northern Ireland`,
                `United States of America`,
                `Uruguay`,
                `Uzbekistan`,
                `Vanuatu`,
                `Venezuela (Bolivarian Republic of)`,
                `Viet Nam`,
                `Wallis and Futuna`,
                `Western Sahara`,
                `Yemen`,
                `Zambia`,
                `Zimbabwe`,
            ]
        },

    },
    methods: {
        async addMerchant() {
            const merchant = {
                id: uuidv4(),
                name: this.merchantName,
                streetAddress: null,
                streetOther: null,
                city: null,
                state: null,
                postalCode: null,
                country: null,
                website: null,
                lat: this.lat,
                lng: this.lng,
            }
            console.log('MERCHANT', merchant)

            const result = await superagent
                .post(`${API_ENDPOINT}/merchants`)
                .send(merchant)
                .set('accept', 'json')
            console.log('ADD MERCHANT RESULT', result)
        },

        requestLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                const altitude = position.coords.altitude
                const accuracy = position.coords.accuracy
                const altitudeAccuracy = position.coords.altitudeAccuracy
                const heading = position.coords.height
                const speed = position.coords.speed
                const timestamp = position.timestamp

                console.log(
                    'latitude', latitude,
                    'longitude', longitude,
                    'altitude', altitude,
                    'accuracy', accuracy,
                    'altitudeAccuracy', altitudeAccuracy,
                    'heading', heading,
                    'speed', speed,
                    'timestamp', timestamp,
                )

                this.lat = latitude
                this.lng = longitude

                this.startPos = this.lat + ',' + this.lng

                // work with this information however you'd like!
            })
        },

        updateLoc(_newLoc) {
            console.log('NEW LOCATION RECIEVED', _newLoc)

            this.lat = _newLoc.lat
            this.lng = _newLoc.lng
        },
    },
    created: function () {
        //
    },
    mounted: function () {
        this.requestLocation()
    },
}
</script>

<style scoped>
/*  */
</style>
