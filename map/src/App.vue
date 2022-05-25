<template>
    <main>
        <Map
            :magicUser="magicUser"
            :isPanelOpen="isPanelOpen"
            @closeMenu="closeMenu"
            @toggleMenu="toggleMenu"
            @openPopup="openPopup"
        />

        <Modals />

        <Popup
            v-if="vendorid"
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
    }),
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
            console.log('MAGIC (isLoggedIn):', isLoggedIn)

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
        },

        closeMenu() {
            // console.log('CLOSE MENU');
            this.isPanelOpen = false
        },

        openPopup(_vendorid, _coordinates) {
            // console.log('POPUP DETAILS', _vendorid, _coordinates)
            this.vendorid = _vendorid
        },

        closePopup() {
            this.vendorid = null
        },

        toggleMenu() {
            this.isPanelOpen = !this.isPanelOpen

            if (this.isPanelOpen) {
                this.isPanelHidden = false
            } else {
                setTimeout(() => {
                    this.isPanelHidden = true
                }, 500)
            }
        },
    },
    created: function () {
        this.isPanelHidden = true
        this.isPanelOpen = false

        /* Initialization. */
        this.init()
    },
}
</script>
