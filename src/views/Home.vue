<template>
    <div class="">
        <Search />

        <Map />

        <InfoBoxes />
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
/*  */
</style>
