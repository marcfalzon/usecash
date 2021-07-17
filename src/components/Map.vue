<template>
    <div class="map">
        <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
        >
            <l-tile-layer
                :url="url"
                :attribution="attribution"
            />

            <l-marker :lat-lng="withPopup">
                <l-popup>
                    <div @click="innerClick">
                        <h2>Armani Exchange</h2>
                        <br>Accepting: BCH, BTC, DASH
                        <br>Last updated: 3 days ago
                    </div>
                </l-popup>
            </l-marker>

            <l-marker :lat-lng="withTooltip">
                <l-popup>
                    <div @click="innerClick">
                        <h2>Cloud99 Vapes</h2>
                        <br>Accepting: BCH
                        <br>Last updated: 12 hours ago
                    </div>
                </l-popup>
            </l-marker>

        </l-map>
    </div>
</template>

<script>
import { Icon, latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

// NOTE: This is a fix for webpack
//       (https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing)
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

// NOTE: Times Square, NYC
const LOCATION = {
    lat: 40.72833199,
    lng: -73.99860620,
}

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
    data() {
        return {
            zoom: 15,
            currentZoom: null,

            center: latLng(LOCATION.lat, LOCATION.lng),
            currentCenter: latLng(LOCATION.lat, LOCATION.lng),

            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>',

            withPopup: latLng(40.7244012, -73.997503),
            withTooltip: latLng(40.7253863, -73.9897977),

            mapOptions: {
                zoomSnap: 1.0
            },
            showMap: true
        };
    },
    methods: {
        zoomUpdate(zoom) {
            this.currentZoom = zoom
        },

        centerUpdate(center) {
            this.currentCenter = center
        },

        innerClick() {

            alert(`Click!`)
        }
    }
}
</script>

<style scoped>
.map {
    border: 2pt solid rgba(90, 90, 90, 0.5);
    background-color: rgba(90, 90, 90, 0.1);
    /* width: 80vw; */
    height: 350px;
    border-radius: 5px;
}
</style>
