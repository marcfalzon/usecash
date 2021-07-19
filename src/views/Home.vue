<template>
    <div class="">
        <Search id="search" />

        <Map id="map" />

        <InfoBoxes id="info-boxes" />

        <Onboarding />
    </div>
</template>

<script>
import InfoBoxes from '@/components/InfoBoxes'
import Map from '@/components/Map'
import Onboarding from '@/components/Onboarding'
import Search from '@/components/Search'

export default {
    components: {
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
    z-index: 1000;
}

#map {
    margin-top: 30px;
    margin: 30px 15px 0;
}
</style>
