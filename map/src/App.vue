<template>
    <main>
        <Map
            :magicUser="magicUser"
            :isPanelOpen="isPanelOpen"
            :categories="categories"
            @closeMenu="closeMenu"
            @toggleMenu="toggleMenu"
            @openPopup="openPopup"
        />

        <Modals />

        <Popup
            v-if="vendorid"
            :geoPos="geoPos"
            :vendorid="vendorid"
            @close="closePopup"
        />

        <Notifs />

        <SidePanel
            class="transition ease-in-out duration-500 sm:duration-700"
            :class="[{ 'hidden': isPanelHidden }, isPanelVisible]"
            :magicUser="magicUser"
            :isPanelOpen="isPanelOpen"
            @toggleMenu="toggleMenu"
            @updateCat="updateCat"
        />
    </main>
</template>

<script>
/* Import modules. */
import { Magic } from 'magic-sdk'

/* Import components. */
import Map from '@/components/Mapbox'
import Modals from '@/components/Modals'
import Popup from '@/components/Popup'
import Notifs from '@/components/Notifs'
import SidePanel from '@/components/SidePanel'

/* Initialize magic key. */
const magicKey = new Magic(process.env.VUE_APP_MAGIC_API_KEY)

export default {
    components: {
        Map,
        Modals,
        Popup,
        Notifs,
        SidePanel,
    },
    data: () => ({
        magicUser: null,
        vendorid: null,

        isPanelOpen: null,
        isPanelHidden: null,
        showMagicLinkWin: null,

        geoPos: null,
        categories: null,
    }),
    watch: {
        '$route.params': function () {
            /* Open (side panel) menu on page change. */
            this.openMenu()
        },
    },
    computed: {
        isPanelVisible() {
            return this.isPanelOpen ? 'opacity-100' : 'opacity-0'
        }
    },
    methods: {
        async init() {
            if (!magicKey) {
                throw new Error(`Oops! You're missing a Magic API Key.`)
            }

            /* Validate magic login. */
            const isLoggedIn = await magicKey.user.isLoggedIn()
                .catch(err => console.error(err))
            console.log('APP (isLoggedIn):', isLoggedIn)

            if (isLoggedIn) {
                /* Request magic user data. */
                this.magicUser = await magicKey.user.getMetadata()
                    .catch(err => console.error(err))
                console.log('MAGIC (user):', this.magicUser)
            }
        },

        openMenu() {
            // console.log('OPEN MENU');
            this.isPanelOpen = true

            this.isPanelHidden = false
        },

        closeMenu() {
            // console.log('CLOSE MENU');
            this.isPanelOpen = false

            setTimeout(() => {
                this.isPanelHidden = true
            }, 500) // NOTE: Delay for animation duration.
        },

        openPopup(_vendorid) {
            // console.log('POPUP DETAILS', _vendorid, _coordinates)
            this.vendorid = _vendorid
        },

        closePopup() {
            this.vendorid = null
        },

        toggleMenu() {
            if (this.isPanelOpen) {
                this.closeMenu()
            } else {
                this.openMenu()
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

                /* Set geo(-location) position. */
                this.geoPos = latitude + ',' + longitude
            })
        },

        updateCat(_newCat) {
            console.log('NEW CATEGORES (App):', _newCat)
            // this.categories = _newCat
            // this.categories = 'hi there!'

            let categories = ''

            Object.keys(_newCat).forEach(_cat => {
                if (_newCat[_cat]) {
                    categories += _cat + ','
                }
            })

            if (categories !== '') {
                console.log('GOT IT', categories.slice(0, categories.length - 1));
                this.categories = categories.slice(0, categories.length - 1)
            } else {
                this.categories = null
            }
        },

    },
    created: function () {
        this.isPanelHidden = true
        this.isPanelOpen = false

        /* Initialization. */
        this.init()
    },
    mounted: function () {
        this.requestLocation()
    },
}
</script>
