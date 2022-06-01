<template>
    <main class="px-5 py-10">
        <div class="space-y-8">
            <section>
                <div>
                    <h3 class="text-2xl leading-6 font-medium text-gray-900">
                        Add New Merchant
                    </h3>

                    <p class="mt-1 text-sm text-red-500 font-medium">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

                <MapEditor
                    id="map-editor"
                    :startPos="startPos"
                    @updateLoc="updateLoc"
                />

                <div class="mt-6 space-y-4">
                    <div class="flex justify-center">
                        <label for="cover-photo" class="block text-xl leading-6 font-medium text-gray-900">
                            Merchant Storefront
                        </label>
                    </div>

                    <div class="mt-0 flex justify-center border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center py-5">
                            <h2 class="block text-xl text-purple-500 font-bold">
                                Upload a Photo
                            </h2>

                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>

                            <div>
                                <input
                                    type="file"
                                    :name="uploadFieldName"
                                    :disabled="isSaving"
                                    @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                    accept="image/*"
                                    class="input-file text-sm"
                                >

                                <div class="p-2">
                                    or drag and drop
                                </div>
                            </div>

                            <div class="text-xs text-gray-500">
                                PNG, JPG, GIF up to 5MB
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mt-3 space-y-4">
                <div class="flex justify-center">
                    <h3 class="text-xl leading-6 font-medium text-gray-900">
                        Merchant Details
                    </h3>
                </div>

                <div class="">
                    <label for="merchant-name" class="block text-lg font-medium text-gray-500">
                        Merchant name
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="merchantName" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="cateogry" class="block text-lg font-medium text-gray-500">
                        Category
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <select v-model="category" autocomplete="category" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md">
                            <option value="atm">ATM &amp; Vending Machine</option>
                            <option value="attraction">Attraction or Point-of-Interest</option>
                            <option value="cafe">Café</option>
                            <option value="food">Food &amp; Dining</option>
                            <option value="grocery">Grocery &amp; Farmers Market</option>
                            <option value="lodging">Hotels &amp; Lodging</option>
                            <option value="nightlife">Nightlife &amp; Bars</option>
                            <option value="services">Professional Services</option>
                            <option value="shopping">Shopping</option>
                            <option value="sports">Sports &amp; Outdoor</option>
                            <option value="transport">Transportation</option>
                            <option value="default">Other</option>
                        </select>
                    </div>
                </div>

                <div class="">
                    <label for="country" class="block text-lg font-medium text-gray-500">
                        Country / Region
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <select v-model="country" autocomplete="country" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md">
                            <option v-for="country in countries" :key="country" :value="country">{{country}}</option>
                        </select>
                    </div>
                </div>

                <div class="">
                    <label for="street-address" class="block text-lg font-medium text-gray-500">
                        Street address
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="streetAddress" autocomplete="street-address" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="city" class="block text-lg font-medium text-gray-500">
                        City
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="city" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="state" class="block text-lg font-medium text-gray-500">
                        State / Province
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="state" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="postal" class="block text-lg font-medium text-gray-500">
                        ZIP / Postal
                        <small class="text-red-300">(required)</small>
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="postal" autocomplete="postal-code" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="website" class="block text-lg font-medium text-gray-500">
                        Website
                    </label>

                    <div class="mt-1">
                        <input type="text" v-model="website" autocomplete="website" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>

                <div class="">
                    <label for="phone" class="block text-lg font-medium text-gray-500">
                        Phone Number
                    </label>

                    <div class="mt-1">
                        <input type="tel" v-model="phone" autocomplete="tel" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md" />
                    </div>
                </div>
            </section>

            <section class="p-3 bg-yellow-100 border-4 border-yellow-500 rounded-xl">
                <h3 class="text-lg sm:text-xl font-medium text-gray-900 text-center">
                    Which Cryptos Are Accepted?
                </h3>

                <div class="mt-4 border-t-2 border-yellow-500 divide-y divide-yellow-300">
                    <div class="relative flex items-center py-3">
                        <div class="min-w-0 flex-1 text-sm">
                            <label for="person-1" class="text-lg font-medium text-gray-700 select-none">
                                Bitcoin (BTC)
                            </label>
                        </div>

                        <div class="ml-3 flex items-center h-5">
                            <input type="checkbox" v-model="crypto.BTC" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-yellow-500 rounded" />
                        </div>
                    </div>

                    <div class="relative flex items-center py-3">
                        <div class="min-w-0 flex-1 text-sm">
                            <label for="person-2" class="text-lg font-medium text-gray-700 select-none">
                                Bitcoin Cash (BCH)
                            </label>
                        </div>

                        <div class="ml-3 flex items-center h-5">
                            <input type="checkbox" v-model="crypto.BCH" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-yellow-500 rounded" />
                        </div>
                    </div>

                    <div class="relative flex items-center py-3">
                        <div class="min-w-0 flex-1 text-sm">
                            <label for="person-3" class="text-lg font-medium text-gray-700 select-none">
                                Dash (DASH)
                            </label>
                        </div>

                        <div class="ml-3 flex items-center h-5">
                            <input type="checkbox" v-model="crypto.DASH" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-yellow-500 rounded" />
                        </div>
                    </div>

                    <div class="relative flex items-center py-3">
                        <div class="min-w-0 flex-1 text-sm">
                            <label for="person-4" class="text-lg font-medium text-gray-700 select-none">
                                Ethereum (ETH)
                            </label>
                        </div>

                        <div class="ml-3 flex items-center h-5">
                            <input type="checkbox" v-model="crypto.ETH" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-yellow-500 rounded" />
                        </div>
                    </div>

                    <div class="relative flex items-center py-3">
                        <div class="min-w-0 flex-1 text-sm">
                            <label for="person-5" class="text-lg font-medium text-gray-700 select-none">
                                Other Cryptos
                            </label>
                        </div>

                        <div class="ml-3 flex items-center h-5">
                            <input type="checkbox" v-model="crypto.OTHER" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-yellow-500 rounded" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <small class="text-red-500 italic font-medium">
                        * Please check all that apply
                    </small>
                </div>
            </section>

            <section class="mt-3">
                <div class="flex flex-col items-center">
                    <h3 class="text-xl leading-6 font-medium text-gray-900">
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
                                    <input type="checkbox" v-model="notifs.StatusChange" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-indigo-300 rounded" />
                                </div>

                                <div class="ml-3 text-sm">
                                    <label for="comments" class="font-medium text-gray-700">Accepted</label>
                                    <p class="text-gray-500">Get notified when this merchant is approved.</p>
                                </div>
                            </div>

                            <div class="relative flex items-start">
                                <div class="flex items-center h-5">
                                    <input type="checkbox" v-model="notifs.Activity" class="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-4 border-indigo-300 rounded" />
                                </div>

                                <div class="ml-3 text-sm">
                                    <label for="candidates" class="font-medium text-gray-700">Activity</label>
                                    <p class="text-gray-500">Receive a monthly summary of this merchant's activity.</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </section>
        </div>

        <div class="mt-10">
            <div class="flex flex-col sm:flex-row justify-center">
                <button type="button" class="w-full bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="text-lg font-medium text-gray-700">
                        Cancel
                    </span>
                </button>

                <button
                    @click="addMerchant"
                    class="w-full mt-3 sm:mt-0 sm:ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span class="text-lg font-medium text-white">
                        Submit New Merchant
                    </span>
                </button>
            </div>
        </div>
    </main>

</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'
import superagent from 'superagent'
import { v4 as uuidv4 } from 'uuid'

/* Import components. */
import MapEditor from '@/components/MapEditor'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default {
    components: {
        MapEditor,
    },
    data: () => ({
        isLoggedIn: null,
        didToken: null,

        lat: null,
        lng: null,
        startPos: null,

        merchantName: null,

        merchantStorefrontPhoto: [],
        merchantStorefrontPhotoId: null,
        merchantStorefrontPhotoUrl: null,

        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos',

        streetAddress: null,
        city: null,
        state: null,
        postal: null,
        country: null,

        category: null,
        crypto: null,
        notifs: null,
        website: null,
        phone: null,
    }),
    watch: {
        // merchantStorefrontPhoto(_val) {
        //     // console.log('MERCHANT STOREFRONT PHOTO CHANGED', _val)
        //
        //     if (_val && _val[0]) {
        //         const fileReader = new FileReader()
        //         fileReader.addEventListener('load', async () => {
        //             this.merchantStorefrontPhotoUrl = fileReader.result
        //
        //             this.merchantStorefrontPhotoId = uuidv4()
        //
        //             const imageBuffer = this.dataUrlToBlob(this.merchantStorefrontPhotoUrl)
        //             console.log('IMAGE BUFFER', imageBuffer)
        //
        //             const response = await superagent
        //                 .post(`${API_ENDPOINT}/admin/media`)
        //                 .attach('storefront', imageBuffer, this.merchantStorefrontPhotoId)
        //                 .catch(console.error)
        //             console.log('RESPONSE', response)
        //
        //             if (!response) {
        //                 // FIXME: We need to better handle errors AND completion success.
        //                 alert('Upload failed!')
        //             }
        //         })
        //         fileReader.readAsDataURL(this.merchantStorefrontPhoto[0])
        //     } else {
        //         this.merchantStorefrontPhotoUrl = null
        //     }
        // },

    },
    computed: {
        countries() {
            return [
                `United States of America`,
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

        isInitial() {
            return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED;
        },

    },
    methods: {
        async addMerchant() {
            /* Validate user. */
            if (!this.isLoggedIn) {
                return alert(`You MUST first sign in to ADD a new merchant.`)
            }

            /* Validate merchant name. */
            if (!this.lat || !this.lng) {
                return alert(`You MUST click a point on the map to continue.`)
            }

            /* Validate merchant storefront photo id. */
            if (!this.merchantStorefrontPhotoId) {
                return alert(`You MUST add a 'Storefront Photo' to continue.`)
            }

            /* Validate merchant name. */
            if (!this.merchantName) {
                return alert(`You MUST enter a 'Merchant Name' to continue.`)
            }

            /* Validate category. */
            if (!this.category) {
                return alert(`You MUST choose a 'Category' to continue.`)
            }

            /* Validate country. */
            if (!this.country) {
                return alert(`You MUST enter a 'Country' to continue.`)
            }

            /* Validate street address. */
            if (!this.streetAddress) {
                return alert(`You MUST enter a 'Street Address' to continue.`)
            }

            /* Validate city. */
            if (!this.city) {
                return alert(`You MUST enter a 'City' to continue.`)
            }

            /* Validate state. */
            if (!this.state) {
                return alert(`You MUST enter a 'State / Province' to continue.`)
            }

            /* Validate postal code. */
            if (!this.postal) {
                return alert(`You MUST enter a 'Zip / Postal' to continue.`)
            }

            /* Validate merchant storefront photo id. */
            if (Object.keys(this.crypto).length) {
                /* Search for selected crypto. */
                const isFound = Object.keys(this.crypto).find(_crypto => {
                    // console.log('CRYPTO', _crypto, this.crypto[_crypto])
                    return this.crypto[_crypto]
                })
                // console.log('IS FOUND', isFound)

                /* Validate selected crypto. */
                if (!isFound) {
                    return alert(`You MUST select at least one crypto currency accepted.`)
                }
            }

            const merchant = {
                // id: uuidv4(),
                category: this.category,
                crypto: this.crypto,
                name: this.merchantName,
                streetAddress: this.streetAddress,
                // streetOther: null,
                city: this.city,
                state: this.state,
                postalCode: this.postal,
                country: this.country,
                website: this.website,
                phone: this.phone,
                media: {
                    storefront: `${API_ENDPOINT}/media/${this.merchantStorefrontPhotoId}.jpg`,
                },
                lat: this.lat,
                lng: this.lng,
                notifs: this.notifs,
            }
            console.log('MERCHANT', merchant)

            const result = await superagent
                .post(`${API_ENDPOINT}/merchants`)
                .set('authorization', `Bearer ${this.didToken}`)
                .send(merchant)
                .set('accept', 'json')
            console.log('ADD MERCHANT RESULT', result)

            /* Validate result. */
            if (result) {
                alert(`${this.merchantName} has been submitted for review.\nThank you!\n\nCheck your profile for 'Rewards' status.`)
            }

        },

        requestLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                /* Set latitude. */
                const latitude = position.coords.latitude

                /* Set longitude. */
                const longitude = position.coords.longitude

                /* Set altitude. */
                const altitude = position.coords.altitude

                /* Set accuracy. */
                const accuracy = position.coords.accuracy

                /* Set altitude accuracy. */
                const altitudeAccuracy = position.coords.altitudeAccuracy

                /* Set heading. */
                const heading = position.coords.height

                /* Set speed. */
                const speed = position.coords.speed

                /* Set timestamp. */
                const timestamp = position.timestamp

                console.info(
                    'Latitude', latitude,
                    'Longitude', longitude,
                    'Altitude', altitude,
                    'Accuracy', accuracy,
                    'Altitude Accuracy', altitudeAccuracy,
                    'Heading', heading,
                    'Speed', speed,
                    'Timestamp', timestamp,
                )

                /* Set starting position. */
                this.startPos = latitude + ',' + longitude
            })
        },

        /**
         * Update Location
         */
        updateLoc(_newLoc) {
            /* Set latitude. */
            this.lat = _newLoc.lat

            /* Set longitude. */
            this.lng = _newLoc.lng
        },

        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
        },
        // async save(formData) {
        //     console.log('FORM DATA', formData);
        //     // upload data to the server
        //     this.currentStatus = STATUS_SAVING;
        //
        //     // const response = await superagent
        //     //     .post(`${API_ENDPOINT}/admin/media`)
        //     //     .attach('storefront', formData, '1234')
        //     //     .catch(console.error)
        //     // console.log('RESPONSE', response)
        //
        //     // upload(formData)
        //     //     .then(x => {
        //     //         this.uploadedFiles = [].concat(x);
        //     //         this.currentStatus = STATUS_SUCCESS;
        //     //     })
        //     //     .catch(err => {
        //     //         this.uploadError = err.response;
        //     //         this.currentStatus = STATUS_FAILED;
        //     //     });
        // },
        async filesChange(fieldName, fileList) {
            console.log('FILES CHANGED (fieldName):', fieldName)
            console.log('FILES CHANGED (fileList):', fileList)
            // handle file changes
            // const formData = new FormData();

            if (!fileList.length) return

            /* Generate new photo id. */
            this.merchantStorefrontPhotoId = uuidv4()

            const response = await superagent
                .post(`${API_ENDPOINT}/admin/media`)
                .set('authorization', `Bearer ${this.didToken}`)
                .attach('storefront', fileList[0], this.merchantStorefrontPhotoId)
                .catch(console.error)
            console.log('RESPONSE', response)
        }

    },
    created: async function () {
        /* Initialize (accepted) crypto. */
        this.crypto = {
            'BTC': false,
            'BCH': false,
            'DASH': false,
            'ETH': false,
            'OTHER': false,
        }

        /* Initialize (user) notifications. */
        this.notifs = {
            'Activity': true,
            'StatusChange': true,
        }

        /* Validate magic login. */
        this.isLoggedIn = await magicKey.user.isLoggedIn()
            .catch(err => console.error(err))
        console.log('MAGIC (isLoggedIn):', this.isLoggedIn)

        this.didToken = await magicKey.user.getIdToken()
            .catch(err => console.error(err))
        console.log('MAGIC (didToken):', this.didToken)
    },
    mounted: function () {
        this.requestLocation()
    },
}
</script>
