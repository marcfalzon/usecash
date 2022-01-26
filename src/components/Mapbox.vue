<template>
    <main>
        <div id="map" class="w-full h-96">
            <!-- Mapbox container. -->
        </div>
    </main>
</template>


<script>
import Mapbox from 'mapbox-gl'
import superagent from 'superagent'

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW9kZW5lcm8iLCJhIjoiY2t0eHAxY2JjMDh3MTJ0b3FleGdhYWk4bSJ9.2WOkhBYSiCSd6mW74ocbcQ' // prod
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW9kZW5lcm8iLCJhIjoiY2tza3hsazR0MGVkazJ2dGVwOXhpaDkzeiJ9.Ogmv-xLwll3Z_1uuCItolg' // localhost

// const API_ENDPOINT = `https://api.use.cash/v1`
const API_ENDPOINT = `https://usecash-api.modenero.dev/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    props: {
        startPos: String,
        startZoom: Number,
        isEmbedded: Boolean,
    },
    components: {
        //
    },
    watch: {
        /**
         * Start Position
         */
        startPos: function (_latlng) {
            /* Validate center. */
            if (!_latlng) {
                return console.error('NO coordinates', _latlng)
            }

            /* Set latitude. */
            const lat = _latlng.split(',')[0]

            /* Set longitude. */
            const lng = _latlng.split(',')[1]

            /* Set center. */
            const center = [ lng, lat ]

            /* Set map center. */
            this.map.setCenter(center)
        },
    },
    data() {
        return {
            map: null,
            vendors: null,
        }
    },
    methods: {
        init(_center, _zoom) {
            /* Set configuration. */
            const config = {
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: _center,
                zoom: _zoom,
            }

            /* Initialize map object. */
            this.map = new Mapbox.Map(config)

            /* Add full screen control. */
            this.map.addControl(new Mapbox.FullscreenControl())

            /* Add navigation control. */
            this.map.addControl(new Mapbox.NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: false,
            }))

            /* Handle map movement. */
            this.map.on('moveend', async () => {
                /* Manage map. */
                this.mapManager()
            })

            /* Handle loaded map. */
            this.map.on('load', async () => {
                // When a click event occurs on a feature in the vendors layer, open a popup at the
                // location of the feature, with description HTML from its properties.
                this.map.on('click', 'unclustered-atm-point', (e) => {
                    // console.log('CLICKED POINT', e)

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Add popup. */
                    new Mapbox.Popup({
                        className: 'mapbox-popup',
                        maxWidth: '320px',
                        closeButton: false,
                    })
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map)
                })

                this.map.on('click', 'unclustered-bch-point', (e) => {
                    // console.log('CLICKED POINT', e)

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Add popup. */
                    new Mapbox.Popup({
                        className: 'mapbox-popup',
                        maxWidth: '320px',
                        closeButton: false,
                    })
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map)
                })

                this.map.on('click', 'unclustered-exclusive-point', (e) => {
                    // console.log('CLICKED POINT', e)

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Add popup. */
                    new Mapbox.Popup({
                        className: 'mapbox-popup',
                        maxWidth: '320px',
                        closeButton: false,
                    })
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.map)
                })

                // inspect a cluster on click
                this.map.on('click', 'clusters', (e) => {
                    const features = this.map.queryRenderedFeatures(e.point, {
                        layers: ['clusters']
                    })
                    // console.log('FEATURES', features)

                    /* Set cluster id. */
                    const clusterId = features[0].properties.cluster_id

                    this.map
                        .getSource('vendors')
                        .getClusterExpansionZoom(
                            clusterId,
                            (err, zoom) => {
                                if (err) return

                                this.map.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom
                                })
                            }
                        )
                })

                /* Handle mouse events. */
                this.map.on('mouseenter', 'clusters', () => {
                    this.map.getCanvas().style.cursor = 'pointer'
                })
                this.map.on('mouseleave', 'clusters', () => {
                    this.map.getCanvas().style.cursor = ''
                })

                /* Handle mouse events. */
                this.map.on('mouseenter', 'unclustered-atm-point', () => {
                    this.map.getCanvas().style.cursor = 'pointer'
                })
                this.map.on('mouseleave', 'unclustered-atm-point', () => {
                    this.map.getCanvas().style.cursor = ''
                })

                /* Handle mouse events. */
                this.map.on('mouseenter', 'unclustered-bch-point', () => {
                    this.map.getCanvas().style.cursor = 'pointer'
                })
                this.map.on('mouseleave', 'unclustered-bch-point', () => {
                    this.map.getCanvas().style.cursor = ''
                })

                /* Handle mouse events. */
                this.map.on('mouseenter', 'unclustered-exclusive-point', () => {
                    this.map.getCanvas().style.cursor = 'pointer'
                })
                this.map.on('mouseleave', 'unclustered-exclusive-point', () => {
                    this.map.getCanvas().style.cursor = ''
                })

                /* Load image. */
                this.map.loadImage('https://i.imgur.com/A9jVeq1.png', // ATM icon 32 px
                    (_error, _image) => {
                        // console.log('ERROR', _error)
                        // console.log('IMAGE', _image)

                        if (_error) throw _error

                        /* Add ATM marker. */
                        this.map.addImage('atm-marker', _image)

                        // this.map.loadImage('https://i.imgur.com/CvdwMwu.png', // BCH icon 40 px
                        this.map.loadImage('https://i.imgur.com/9zOS6wv.png', // BCH icon 32 px
                            (_error, _image) => {
                                // console.log('ERROR', _error)
                                // console.log('IMAGE', _image)

                                if (_error) throw _error

                                /* Add ATM marker. */
                                this.map.addImage('bch-marker', _image)

                                this.map.loadImage('https://i.imgur.com/1r1YifH.png', // Exclusive icon 32 px
                                    (_error, _image) => {
                                        // console.log('ERROR', _error)
                                        // console.log('IMAGE', _image)

                                        if (_error) throw _error

                                        /* Add exclusive marker. */
                                        this.map.addImage('exclusive-marker', _image)

                                        /* Manage map. */
                                        this.mapManager()
                                    }
                                )

                            }
                        )

                    }
                )

            })
        },

        /* Handle zoom update. */
        zoomUpdate(_zoom) {
            this.currentZoom = _zoom
        },

        /* Handle center update. */
        centerUpdate(_center) {
            this.currentCenter = _center
        },

        /* Handle inner click. */
        innerClick() {
            alert(`Click!`)
        },

        /**
         * Manage Map
         *
         * Determine the map area and request the relevant data from the
         * remote API.
         */
        async mapManager() {
            // console.log('MAP MOVED')

            /* Set map bounds. */
            const bounds = {
                ne: this.map.getBounds()._ne,
                sw: this.map.getBounds()._sw,
            }
            // console.log('BOUNDS', 'ne', bounds.ne, 'sw', bounds.sw)

            const pkg = {
                cat: 'atm',
                bounds,
            }
            // console.log('PKG', pkg)

            // console.log('SENDING', `${API_ENDPOINT}/search/map`, pkg, JSON.stringify(pkg))
            const result = await superagent
                .post(`${API_ENDPOINT}/search/map`)
                .send(pkg)
                .set('accept', 'json')

            /* Set vendors. */
            const vendors = result.body
            console.log('VENDORS:', vendors)

            /* Validate vendors. */
            if (vendors) {
                /* Send vendors back home. */
                this.$emit('onUpdate', vendors)

                /* Clear vendors. */
                this.vendors = []

                vendors.forEach(vendor => {
                    /* Initialize details. */
                    let details = '<main class="border-2 border-indigo-200 rounded-xl bg-indigo-50 p-3">'

                    /* Validate vendor. */
                    if (vendor) {
                        /* Initialize address. */
                        let address = ''

                        /* Initialize map link. */
                        let mapLink

                        if (vendor.houseno && vendor.street) {
                            address += `${vendor.houseno} ${vendor.street}<br>`
                        } else if (vendor.streetAddress) {
                            address += `${vendor.streetAddress}<br>`
                        } else if (vendor.street) {
                            address += `${vendor.street}<br>`
                        }

                        if (vendor.city && vendor.state && vendor.postcode) {
                            address += `${vendor.city}, ${vendor.state} ${vendor.postcode}<br>`
                        } else if (vendor.city && vendor.state && vendor.postalCode) {
                            address += `${vendor.city}, ${vendor.state} ${vendor.postalCode}<br>`
                        }

                        /* Handle iOS devices. */
                        if( (navigator.platform.indexOf('iPhone') != -1)
                            || (navigator.platform.indexOf('iPod') != -1)
                            || (navigator.platform.indexOf('iPad') != -1)
                        ) {
                            // FIXME: We should use Apple Maps.
                            mapLink = `maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${address}`
                        } else {
                            // FIXME: Make sure this works with alternative Android maps.
                            mapLink = `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${address}`
                        }

                        details += `<div class="text-center text-lg text-gray-800 font-extrabold">${vendor.name || vendor.companyName}</div>`

                        details += `<div class="text-right"><span class="text-xs text-gray-500 font-medium uppercase">${vendor.category === 'default' ? 'BUSINESS' : Array.isArray(vendor.category) ? vendor.category[0] : vendor.category}</span></div>`

                        if (address) {
                            details += `<a class="text-blue-500 hover:underline font-medium mt-3" href="${mapLink}" target="_blank">${address}</a><br>`
                        }

                        if (vendor.phone) {
                            details += `<a class="text-blue-500 hover:underline" href="tel:${vendor.phone}">${vendor.phone}</a><br>`
                        }

                        if (vendor.email) {
                            details += `<a class="text-blue-500 hover:underline" href="mailto:${vendor.email}">${vendor.email}</a><br>`
                        }

                        if (vendor.googleBusiness) {
                            details += `<div class="text-center"><a class="text-blue-500 hover:underline text-base font-bold" href="${vendor.googleBusiness}" target="_blank">Google Business (link)</a></div>`
                        }

                        details += '</main>'

                        /* Update details. */
                        // $('div#vendor-details-' + venueid)
                        //     .html(details)
                    }
                    // console.log('DETAILS', details);

                    this.vendors.push({
                        id: vendor.id,
                        cat: vendor.category,
                        isExclusive: vendor.users ? true : false, // FIXME: Is this a sufficient flag.
                        lat: vendor.lat,
                        lng: vendor.lng,
                        latlng: [ vendor.lat, vendor.lng ],
                        details,
                    })

                })

                /* Initialize features. */
                const features = []

                /* Handle vendors. */
                this.vendors.forEach(_vendor => {
                    /* Set feature. */
                    const feature = {
                        'type': 'Feature',
                        'properties': {
                            'category': _vendor.cat,
                            'description': _vendor.details,
                            'isExclusive': _vendor.isExclusive,
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [ _vendor.lng, _vendor.lat ] // NOTE: Center coords are reversed.
                        }
                    }

                    /* Add feature. */
                    features.push(feature)
                })

                /* Build GeoJSON data. */
                const data = {
                    'type': 'FeatureCollection',
                    features,
                }

                /* Update map data. */
                this.updateMap(data)
            }

        },

        /**
         * Update Map
         *
         * Set map sources, markers and layers.
         */
        updateMap(_data) {
            /* Set source. */
            const source = this.map.getSource('vendors')

            /* Validate source. */
            if (source) {
                // console.info('Updating map..', _data)

                /* Update map data. */
                return source.setData(_data)
            }

            /* Set map type. */
            const type = 'geojson'

            /* Set data. */
            const data = _data

            /* Set cluster (flag). */
            const cluster = true

            /* Set cluster maximum zoom. */
            // NOTE: Max zoom to cluster points on.
            const clusterMaxZoom = 14

            /* Set cluster radius. */
            // NOTE: Radius of each cluster when clustering points (defaults to 50).
            const clusterRadius = 50

            /* Add (new) source. */
            this.map.addSource('vendors', {
                // This GeoJSON contains features that include an "icon"
                // property. The value of the "icon" property corresponds
                // to an image in the Mapbox Streets style's sprite.
                type,
                data,
                cluster,
                clusterMaxZoom,
                clusterRadius,
            })

            this.map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'vendors',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        500,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            })

            this.map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'vendors',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            })

            this.map.addLayer({
                id: 'unclustered-atm-point',
                type: 'symbol',
                source: 'vendors',
                filter: ['all',
                    ['!', ['has', 'point_count']],
                    ['==', ['get', 'category'], 'atm'],
                ],
                layout: {
                    'icon-image': 'atm-marker',
                    'icon-allow-overlap': true,
                }
            })

            this.map.addLayer({
                id: 'unclustered-bch-point',
                type: 'symbol',
                source: 'vendors',
                filter: ['all',
                    ['!', ['has', 'point_count']],
                    ['!=', ['get', 'category'], 'atm'],
                    ['!=', ['get', 'isExclusive'], true],
                ],
                layout: {
                    'icon-image': 'bch-marker',
                    'icon-allow-overlap': true,
                }
            })

            this.map.addLayer({
                id: 'unclustered-exclusive-point',
                type: 'symbol',
                source: 'vendors',
                filter: ['all',
                    ['!', ['has', 'point_count']],
                    ['!=', ['get', 'category'], 'atm'],
                    ['==', ['get', 'isExclusive'], true],
                ],
                layout: {
                    'icon-image': 'exclusive-marker',
                    'icon-allow-overlap': true,
                }
            })

        },

    },
    created: function () {
        /* Set Mapbox access token. */
        Mapbox.accessToken = MAPBOX_ACCESS_TOKEN

    },
    mounted: function () {
        /* Initialize variables. */
        let center
        let zoom

        /* Validate start position. */
        if (this.startPos) {
            /* Set latitude. */
            const lat = this.startPos.split(',')[0]

            /* Set longitude. */
            const lng = this.startPos.split(',')[1]

            /* Set center. */
            center = [ lng, lat ]
        }

        if (this.startZoom) {
            /* Set zoom. */
            zoom = this.startZoom
        } else {
            /* Set zoom. */
            zoom = 12
        }

        console.log('CENTER', center)

        /* Validate center. */
        if (center) {
            this.init(center, zoom)
        } else {
            /* Set (geolocation) options. */
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

            /* Handle geolocation. */
            navigator.geolocation.getCurrentPosition(_position => {
                // console.log('POSITION', _position)

                const lat = _position.coords.latitude
                // console.log('LAT', lat)

                const lng = _position.coords.longitude
                // console.log('LNG', lng)

                /* Initialize map. */
                this.init([ lng, lat ], zoom)
            }, (_err) => {
                console.log('LOCATION ERROR', _err)

                if (_err) {
                    alert(_err.message ? _err.message : `Your current position could not be determined.`)
                }

                /* Initialize map. */
                // NOTE: Set to Jersey City, New Jersey.
                this.init([ -74.1389426, 40.7152232 ], zoom)
            }, options)
        }

    },
}
</script>

<style>
/* FIXME: DO WE STILL NEED THESE STYLES?? */
/* div.mapboxgl-popup-tip: {
    background-color: #3333FF !important;
} */

/* div.mapboxgl-popup-content: {
    background-color: #3399FF !important;
} */
</style>
