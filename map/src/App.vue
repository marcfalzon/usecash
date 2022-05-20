<template>
    <main>
        <Map
            :isPanelOpen="isPanelOpen"
            @closeMenu="closeMenu"
            @openMagicLink="openMagicLink"
            @closeMagicLink="closeMagicLink"
            @toggleMenu="toggleMenu"
        />

        <!-- <Footer /> -->
        <Modals />
        <Notifs />
        <SidePanel
            class="transition ease-in-out duration-500 sm:duration-700"
            :class="[{ 'hidden': isPanelHidden }, isPanelVisible]"
            :isPanelOpen="isPanelOpen"
            @toggleMenu="toggleMenu"
        />

        <MagicLinkWin
            v-if="showMagicLinkWin"
            @closeMagicLink="closeMagicLink"
        />
    </main>
</template>

<script>
/* Import components. */
import MagicLinkWin from '@/components/MagicLinkWin'
import Map from '@/components/Mapbox'
import Modals from '@/components/Modals'
import Notifs from '@/components/Notifs'
import SidePanel from '@/components/SidePanel'

export default {
    components: {
        MagicLinkWin,
        Map,
        Modals,
        Notifs,
        SidePanel,
    },
    data: () => ({
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
        openMenu() {
            // console.log('OPEN MENU');
            this.isPanelOpen = true
        },

        closeMenu() {
            // console.log('CLOSE MENU');
            this.isPanelOpen = false
        },

        openMagicLink() {
            this.showMagicLinkWin = true
        },

        closeMagicLink() {
            this.showMagicLinkWin = false
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
    },
}
</script>
