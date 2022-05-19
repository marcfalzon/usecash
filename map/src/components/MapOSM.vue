<template>
    <main>
        <div class="hidden full-screen text-right">
            <button>
                OPEN FULL SCREEN MAP
            </button>
        </div>

        <l-map
            v-if="showMap"
            class="map"
            ref="map"
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
                        <h2 class="text-xl">Vape Supply Company</h2>
                        <h3 class="font-bold">
                            40 Bushwick Avenue
                            <br />New York City, 11211
                        </h3>
                        <br>Accepting: <span class="text-red-600 font-bold">BCH, BTC, DASH</span>
                        <br>Last updated: <span class="text-green-600 font-bold">3 days ago</span>
                    </div>
                </l-popup>
            </l-marker>

            <l-marker :lat-lng="withTooltip">
                <l-popup class="marker">
                    <div @click="innerClick" class="grid grid-cols-2 gap-4">
                        <div>
                            <img class="marker-thumbnail" src="https://i.imgur.com/trTOx15.jpg" />

                            <h1>Cloud99 Vapes</h1>

                            <p class="description">
                                Cloud99 Vapes is the largest vape shop serving Rockland County, NY and surrounding areas.
                                We have all types of e-cigarettes, e-juices, dry herb vaporizers and more.
                                <!-- New flavors and lines are added every week. -->
                                <!-- Over 200 flavors of juice in over 30 lines. -->
                            </p>
                        </div>

                        <div>
                            <p class="address text-right">
                                351 W Rte 59
                                <br />Nanuet, NY 10954
                            </p>

                            <p class="accepting text-right">
                                <strong>ACCEPTING</strong>
                                <br />BCH, BTC, DASH
                            </p>

                            <div class="activity text-right">
                                Last <strong>BITCOIN</strong> Transaction
                                <h2>12 <small>HOURS AGO</small></h2>
                            </div>
                        </div>
                    </div>
                </l-popup>
            </l-marker>
        </l-map>
    </main>
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
    lng: -73.99360620,
}

export default {
    props: {
        startPos: String,
        startZoom: Number,
        isEmbedded: Boolean,
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
    watch: {
        startPos: function (_latlng) {
            const lat = _latlng.split(',')[0]
            const lng = _latlng.split(',')[1]

            this.map.setView({ lat, lng }, 12)
        },
    },
    data() {
        return {
            map: null,

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
        init() {
            /* Initialize map object. */
            this.map = this.$refs.map.mapObject

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
    },
    mounted: function () {
        // NOTE: Wait for map object to become available
        this.$nextTick(this.init)

    },
}
</script>

<style scoped>
h1 {
    margin-top: 10px;
    font-size: 1.5em;
}

.map {
    border: 2pt solid rgba(90, 90, 90, 0.5);
    background-color: rgba(90, 90, 90, 0.1);
    /* width: 80vw; */
    /* height: 350px; */
    height: 60vh;
    border-radius: 5px;
}

.marker {
    width: 300px;
}
.marker-thumbnail {
    background-color: pink;
    /* width: 200px; */
    border: 1pt solid rgba(180, 180, 180, 0.8);
    padding: 3px;
    border-radius: 5px;
}

.address {
    font-size: 0.9em;
}

.description {
    margin-top: 5px;
    font-size: 0.8em;
    height: 4.0em;
    overflow: hidden;
}

.accepting {
    font-size: 0.8em;
}

.activity {
    font-size: 0.8em;
}
.activity h2 {
    font-size: 1.2em;
    font-weight: 800;
}

.full-screen {
    margin: -15px 10px 15px 0;
}
.full-screen button {
    border: 5px solid rgba(240, 90, 240, 1.0);
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgba(60, 120, 180, 0.5);
    font-weight: 800;
    color: rgba(255, 255, 255, 0.8);
}
</style>
