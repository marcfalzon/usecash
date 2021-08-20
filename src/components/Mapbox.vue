<template>
    <main>
        <div id="mapContainer" class="basemap"></div>
    </main>
</template>        <div id="map"></div>


<script>
import mapboxgl from 'mapbox-gl'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW9kZW5lcm8iLCJhIjoiY2tza3hsazR0MGVkazJ2dGVwOXhpaDkzeiJ9.Ogmv-xLwll3Z_1uuCItolg'

export default {
    props: {
        startPos: String,
        startZoom: Number,
        isEmbedded: Boolean,
    },
    components: {
        // LMap,
        // LTileLayer,
        // LMarker,
        // LPopup,
    },
    watch: {
        // startPos: function (_latlng) {
        //     console.log('I JUST SAW THE COORDS CHANGE:', _latlng)
        //
        //     const lat = _latlng.split(',')[0]
        //     const lng = _latlng.split(',')[1]
        //
        //     this.map.setView({ lat, lng }, 12)
        // },
    },
    data() {
        return {
            accessToken: MAPBOX_ACCESS_TOKEN,

            // LEGACY

            // map: null,
            //
            // zoom: 15,
            // currentZoom: null,
            //
            // center: latLng(LOCATION.lat, LOCATION.lng),
            // currentCenter: latLng(LOCATION.lat, LOCATION.lng),
            //
            // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            // attribution:
            //     '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>',
            //
            // withPopup: latLng(40.7244012, -73.997503),
            // withTooltip: latLng(40.7253863, -73.9897977),
            //
            // mapOptions: {
            //     zoomSnap: 1.0
            // },
            // showMap: true
        };
    },
    methods: {
        init() {
            /* Initialize map object. */
            // this.map = this.$refs.map.mapObject

            /* Initialize map object. */
            new mapboxgl.Map({
                container: 'mapContainer',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [ 103.811279, 1.345399 ],
                zoom: 12,
                maxBounds: [
                    [ 103.6, 1.1704753 ],
                    [ 104.1, 1.4754753 ],
                ],
            })

        },

        zoomUpdate(_zoom) {
            this.currentZoom = _zoom
        },

        centerUpdate(_center) {
            this.currentCenter = _center
        },

        innerClick() {

            alert(`Click!`)
        }
    },
    created: function () {
        //
        mapboxgl.accessToken = this.accessToken
    },
    mounted: function () {
        // NOTE: Wait for map object to become available
        // this.$nextTick(this.init)
        // setTimeout(this.init, 10000)
        this.init()



    },
}
</script>

<style lang="scss" scoped>
.basemap {
    width: 100%;
    height: 100%;
}
</style>
