<template>
    <div class="">
        <Search id="search" />

        <Map id="map" />

        <InfoBoxes id="info-boxes" />
    </div>
</template>

<script>
import InfoBoxes from '@/components/InfoBoxes'
import Map from '@/components/Map'
import Search from '@/components/Search'

export default {
    components: {
        InfoBoxes,
        Map,
        Search,
    }
}
</script>

<style scoped>
#search {
    margin-top: 20px;
    padding: 0 15px;
}

#map {
    margin-top: 30px;
}
</style>
