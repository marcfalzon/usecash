<template>
    <main>
        <!-- <Header
            :isMenuOpen="isMenuOpen"
            @openMenu="openMenu"
            @openMagicLink="openMagicLink"
            @closeMagicLink="closeMagicLink"
        /> -->

        <Map
            :isMenuOpen="isMenuOpen"
            @closeMenu="closeMenu"
            @openMagicLink="openMagicLink"
            @closeMagicLink="closeMagicLink"
            @toggleMenu="toggleMenu"
        />

        <!-- <Footer /> -->
        <Modals />
        <Notifs />
        <SidePanel class="hidden" />

        <MagicLinkWin
            v-if="showMagicLinkWin"
            @closeMagicLink="closeMagicLink"
        />
    </main>
</template>

<script>
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
        isMenuOpen: null,
        showMagicLinkWin: null,
    }),
    methods: {
        openMenu() {
            // console.log('OPEN MENU');
            this.isMenuOpen = true
        },

        closeMenu() {
            // console.log('CLOSE MENU');
            this.isMenuOpen = false
        },

        openMagicLink() {
            this.showMagicLinkWin = true
        },

        closeMagicLink() {
            this.showMagicLinkWin = false
        },

        toggleMenu() {
            alert('toggle dat shit NOW!')
        },
    },
    created: function () {
        this.isMenuOpen = false
    },
}
</script>
