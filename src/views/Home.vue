<template>
    <div class="">
        <!-- <Search id="search" /> -->

        <Map />

        <!-- <InfoBoxes id="info-boxes" /> -->

        <!-- <hr class="mt-3 mb-10 hidden" /> -->

        <!-- <Feeds id="feeds" class="hidden" /> -->

        <!-- <Onboarding /> -->
        <SidePanel class="hidden" />
    </div>
</template>

<script>
/* Import components. */
// import Feeds from '@/components/Feeds'
// import InfoBoxes from '@/components/InfoBoxes'
// import Map from '@/components/MapOSM'
import Map from '@/components/Mapbox'
// import Onboarding from '@/components/Onboarding'
// import Search from '@/components/Search'
import SidePanel from '@/components/SidePanel'

export default {
    components: {
        // Feeds,
        // InfoBoxes,
        Map,
        // Onboarding,
        // Search,
        SidePanel,
    }
}
</script>
