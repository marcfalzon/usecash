<template>
    <div class="">
        <Search id="search" />

        <Map id="map" />

        <InfoBoxes id="info-boxes" />

        <hr class="mt-3 mb-10 hidden" />

        <Feeds id="feeds" class="hidden" />

        <Onboarding />
    </div>
</template>

<script>
/* Import components. */
import Feeds from '@/components/Feeds'
import InfoBoxes from '@/components/InfoBoxes'
import Map from '@/components/MapOSM'
import Onboarding from '@/components/Onboarding'
import Search from '@/components/Search'

export default {
    components: {
        Feeds,
        InfoBoxes,
        Map,
        Onboarding,
        Search,
    }
}
</script>

<style scoped>
#search {
    margin-top: 20px;
    padding: 0 15px;
    z-index: 100;
}

#map {
    margin-top: 30px;
    margin: 30px 15px 0;
}
</style>
