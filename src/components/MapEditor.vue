<template>
    <main>
        <!-- <div class="full-screen text-right">
            <button>
                OPEN FULL SCREEN MAP
            </button>
        </div> -->

        <div class="full-screen">
            Please place a pin on the location of the merchant you are adding to our database.
            <div class="block">
                Latitude: <strong class="text-red-500">{{pinLat ? pinLat.toFixed(4) : 'n/a'}}</strong> |
                Longitude: <strong class="text-red-500">{{pinLng ? pinLng.toFixed(4) : 'n/a'}}</strong>
            </div>
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

            <l-circle
                @click="handleValidPin"
                :lat-lng="circle.center"
                :radius="circle.radius"
                :color="circle.color"
            />

            <l-marker ref="marker" :lat-lng="activeLoc" :draggable=true>
                <l-popup>
                    <div @click="newMerchantHandler">
                        <h2 class="text-center font-bold text-blue-500 uppercase">New Merchant Location</h2>
                        <span class="block">Accepting: <strong>BCH, BTC, DASH</strong></span>
                        <span class="block">Last updated: <strong>just now</strong></span>
                    </div>
                </l-popup>
            </l-marker>
        </l-map>
    </main>
</template>

<script>
import { Icon, latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from 'vue2-leaflet'

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

const DEFAULT_ZOOM = 15

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
        LCircle,
    },
    watch: {
        startPos: function (_latlng) {
            console.log('I JUST SAW THE COORDS CHANGE:', _latlng)

            const lat = _latlng.split(',')[0]
            const lng = _latlng.split(',')[1]

            this.map.setView({ lat, lng }, DEFAULT_ZOOM)

            this.circle.center = latLng(lat, lng)
        },
    },
    data() {
        return {
            map: null,
            marker: null,

            zoom: DEFAULT_ZOOM,
            currentZoom: null,

            center: latLng(LOCATION.lat, LOCATION.lng),
            currentCenter: latLng(LOCATION.lat, LOCATION.lng),

            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a>',

            activeLoc: latLng(45.4985, -73.5710),

            mapOptions: {
                zoomSnap: 1.0
            },
            showMap: true,
            circle: {
                center: latLng(LOCATION.lat, LOCATION.lng),
                radius: 1000,
                color: 'green'
            },
            pinLat: null,
            pinLng: null,
            isValidPin: null,
        };
    },
    methods: {
        init() {
            /* Initialize map object. */
            this.map = this.$refs.map.mapObject

            /* Initialize map object. */
            this.marker = this.$refs.marker.mapObject

            /* Handle map clicks. */
            this.map.on('click', (event) => {
                /* Set pin position. */
                const position = event.latlng
                // console.log('POSITION', position)

                /* Update pin position. */
                if (this.isValidPin) {
                    this.pinLat = position.lat
                    this.pinLng = position.lng

                    /* Update active location. */
                    this.activeLoc = position

                    this.$emit('updateLoc', position)
                } else {
                    alert('Invalid pin position.\nYou MUST travel closer to the merchant.')
                }
            })

            /* Handle draggable marker. */
            this.marker.on('dragend', () => {
                /* Set pin position. */
                const position = this.marker.getLatLng()
                // console.log('POSITION', position)

                /* Update pin position. */
                if (this.isValidPin) {
                    this.pinLat = position.lat
                    this.pinLng = position.lng

                    /* Update active location. */
                    this.activeLoc = position

                    this.$emit('updateLoc', position)
                } else {
                    alert('Invalid pin position.\nYou MUST travel closer to the merchant.')
                }
            })

        },

        zoomUpdate(_zoom) {
            this.currentZoom = _zoom
        },

        centerUpdate(_center) {
            this.currentCenter = _center
        },

        /**
         * New Merchant Handler
         */
        newMerchantHandler() {
            alert(`This merchant has NOT YET been added to the community.`)
        },

        handleValidPin() {
            setTimeout(() => {
                /* Set valid pin flag. */
                this.isValidPin = false
            }, 500)

            /* Set valid pin flag. */
            this.isValidPin = true
        },

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
    margin: 15px 10px 15px 0;
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
