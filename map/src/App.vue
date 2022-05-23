<template>
    <main>
        <Map
            :isPanelOpen="isPanelOpen"
            @closeMenu="closeMenu"
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
    </main>
</template>

<script>
/* Import components. */
import Map from '@/components/Mapbox'
import Modals from '@/components/Modals'
import Notifs from '@/components/Notifs'
import SidePanel from '@/components/SidePanel'

export default {
    components: {
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
