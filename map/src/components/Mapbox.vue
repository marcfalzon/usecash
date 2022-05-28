<template>
    <main>
        <div id="map" class="w-screen h-screen">
            <!-- Mapbox container. -->
        </div>
    </main>
</template>


<script>
/* Import modules. */
import Mapbox from 'mapbox-gl'
import moment from 'moment'
import superagent from 'superagent'

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW9kZW5lcm8iLCJhIjoiY2t0eHAxY2JjMDh3MTJ0b3FleGdhYWk4bSJ9.2WOkhBYSiCSd6mW74ocbcQ' // prod
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW9kZW5lcm8iLCJhIjoiY2tza3hsazR0MGVkazJ2dGVwOXhpaDkzeiJ9.Ogmv-xLwll3Z_1uuCItolg' // localhost

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

const USER_INPUT_DELAY = 500 // 0.5 seconds

/**
 * Search Map
 *
 * Searches all merchants and venues, based on user input.
 */
const searchMap = async (_term, _vue) => {
    console.log('SEARCHING FOR', _term)
    const searchResults = document.getElementById('search-results')

    // let target
    let result
    let venues

    result = await fetch(`${API_ENDPOINT}/search/autocomplete/${_term}`)
        .catch(err => console.error(err))

    result = await result.json()
    console.log('AUTOCOMPLETE (result):', result)

    venues = result.venues

    let html = ''
    let count = 0

    html += `<div class="py-2 flex flex-col">`
    venues.forEach(_venue => {
        if (count++ >= 5) return

        html += `
        <div id='${_venue.id}' javascript:alert('${_venue.value}') class="flex flex-row my-1 px-3 py-1 bg-yellow-100 border-2 border-yellow-300 rounded-lg cursor-pointer">
            <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>

            <span class="ml-2 text-lg font-medium truncate">
                ${_venue.value}
            </span>
        </div>
        `
    })
    html += `</div>`

    searchResults.innerHTML = html
    searchResults.style.visibility = 'visible'

    count = 0

    venues.forEach(_venue => {
        if (count++ >= 5) return

        document.getElementById(_venue.id).addEventListener('click', () => {
            _vue.$emit('openPopup', _venue.id)
        })
    })

    // const vendorid = '822bc61a-3b5a-4874-85c2-1b0f0fe2f328'
    //
    // target = `${API_ENDPOINT}/merchants/${vendorid}`
    // result = await fetch(target)
    //     .catch(err => console.error(err))
    // // console.log('MERCHANT RESULT', result)
    //
    // let merchant = await result.json()
    // console.log('MERCHANT (json):', merchant)

}

/**
 * Search Box
 *
 * A universal search box with geo-location (proximity) results.
 */
class SearchBox {
    constructor(_vue) {
        this.vue = _vue
    }

    onAdd(_map) {
        /* Set map. */
        this.map = _map

        this.isTyping = false

        /* Set div container. */
        this.container = document.createElement('div')

        /* Add control class. */
        // NOTE: Required for events.
        this.container.className = 'mapboxgl-ctrl'

        const search = document.createElement('input')

        /* Add Tailwind styling. */
        search.classList.add('search-box') // NOTE: Using a CSS class.
        search.classList.add('w-64')
        search.classList.add('sm:w-96')
        search.classList.add('h-10')
        search.classList.add('px-3')
        search.classList.add('py-5')
        search.classList.add('border-4')
        search.classList.add('border-cyan-600')
        search.classList.add('bg-gradient-to-r')
        search.classList.add('from-cyan-700')
        search.classList.add('to-cyan-800')
        search.classList.add('text-lg')
        search.classList.add('font-bold')
        search.classList.add('text-gray-200')
        search.classList.add('rounded-xl')
        search.classList.add('shadow-lg')
        search.placeholder='what are you looking for?'
        this.container.appendChild(search)

        /* Initialize search results. */
        const searchResults = document.createElement('div')
        searchResults.setAttribute('id','search-results')
        searchResults.style.visibility = 'hidden'
        searchResults.classList.add('mt-1')
        searchResults.classList.add('w-64')
        searchResults.classList.add('sm:w-96')
        searchResults.classList.add('px-3')
        searchResults.classList.add('py-2')
        searchResults.classList.add('border-2')
        searchResults.classList.add('border-gray-400')
        searchResults.classList.add('bg-gradient-to-r')
        searchResults.classList.add('from-gray-200')
        searchResults.classList.add('to-gray-100')
        searchResults.classList.add('rounded-xl')
        searchResults.classList.add('shadow-lg')
        this.container.appendChild(searchResults)

        /* Handle user input. */
        // TODO: Handle pasted text (via keyboard & mouse).
        search.addEventListener('keyup', (_evt) => {
            // console.log('WHAT KEY', search.value, _evt)
            clearTimeout(this.isTyping)

            const searchResults = document.getElementById('search-results')
            searchResults.style.visibility = 'hidden'
            searchResults.innerHTML = ''

            if (_evt.keyCode === 27) {
                /* Clear search box. */
                return search.value = ''
            }

            if (_evt.keyCode === 13) {
                // console.log('SEARCH FOR', search.value)

                if (!search.value || search.value.length === 0) {
                    return alert(`I can't read your mind.\nYou MUST enter a search term to continue.`)
                }

                if (search.value.length < 3) {
                    return alert(`Oops! [ ${search.value} ] won't do.\nPlease enter a least 3 characters to begin searching.`)
                }

                /* Search map. */
                searchMap(search.value, this.vue)

                /* Clear search box. */
                return search.value = ''
            }

            if (search.value && search.value.length >= 3) {
                /* Handle user input delay. */
                this.isTyping = setTimeout(() => {
                    // console.log('SEARCH FOR', search.value)

                    /* Search map. */
                    searchMap(search.value, this.vue)
                }, USER_INPUT_DELAY)
            }
        })

        return this.container
    }

    onRemove(){
        this.container.parentNode.removeChild(this.container)
        this.map = undefined
    }
}

/**
 * Side Panel Menu Button
 *
 * Used to toggle the sliding side panel.
 */
class SidePanelMenuBtn {
    constructor(_vue) {
        this.vue = _vue
    }

    onAdd(_map) {
        /* Set map. */
        this.map = _map

        /* Set div container. */
        this.container = document.createElement('div')

        /* Add control class. */
        // NOTE: Required for events.
        this.container.className = 'mapboxgl-ctrl'

        const img = document.createElement('img')
        img.src = 'https://i.imgur.com/BvoXJUJ.png'
        this.container.appendChild(img)

        /* Add Tailwind styling. */
        this.container.classList.add('w-12')
        this.container.classList.add('px-2')
        this.container.classList.add('py-2')
        this.container.classList.add('border-2')
        this.container.classList.add('border-cyan-800')
        this.container.classList.add('bg-cyan-600')
        this.container.classList.add('text-xl')
        // this.container.classList.add('text-pink-500')
        this.container.classList.add('rounded-xl')
        this.container.classList.add('shadow-lg')
        this.container.classList.add('cursor-pointer')

        this.container.addEventListener('click', () => {
            // this.vue.toggleMenu()
            this.vue.$emit('toggleMenu')
        })

        this.container.addEventListener('mouseover', () => {
            this.container.classList.remove('bg-pink-200')
            this.container.classList.add('bg-yellow-500')

            this.container.classList.add('font-bold')
        })

        this.container.addEventListener('mouseout', () => {
            this.container.classList.remove('bg-yellow-500')
            this.container.classList.add('bg-pink-200')

            this.container.classList.remove('font-bold')
        })

        return this.container
    }

    onRemove(){
        this.container.parentNode.removeChild(this.container)
        this.map = undefined
    }
}

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
            this.map.addControl(new Mapbox.FullscreenControl(), 'bottom-right')

            /* Add navigation control. */
            this.map.addControl(new Mapbox.NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: false,
            }), 'bottom-right')

            /* Add side panel menu button. */
            this.map.addControl(new SidePanelMenuBtn(this), 'top-right')

            /* Add search box. */
            this.map.addControl(new SearchBox(this), 'top-left')

            /* Handle map movement. */
            this.map.on('moveend', () => {
                /* Manage map. */
                this.mapManager()
            })

            /* Handle loaded map. */
            this.map.on('load', async () => {
                // When a click event occurs on a feature in the vendors layer, open a popup at the
                // location of the feature, with description HTML from its properties.
                this.map.on('click', 'unclustered-atm-point', (e) => {
                    /* Set vendor id. */
                    const vendorid = e.features[0].properties.id

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    // const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Open (modal) popup. */
                    this.$emit('openPopup', vendorid, coordinates)
                })

                this.map.on('click', 'unclustered-bch-point', (e) => {
                    /* Set vendor id. */
                    const vendorid = e.features[0].properties.id

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    // const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Open (modal) popup. */
                    this.$emit('openPopup', vendorid, coordinates)
                })

                this.map.on('click', 'unclustered-exclusive-point', (e) => {
                    /* Set vendor id. */
                    const vendorid = e.features[0].properties.id

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice()
                    // const description = e.features[0].properties.description

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                    }

                    /* Open (modal) popup. */
                    this.$emit('openPopup', vendorid, coordinates)
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

                /* Add image. */
                await this.addImage(
                    'atm-marker',
                    'https://i.imgur.com/A9jVeq1.png',
                )

                /* Add image. */
                await this.addImage(
                    'bch-marker',
                    'https://i.imgur.com/9zOS6wv.png',
                )

                /* Add image. */
                await this.addImage(
                    'exclusive-marker',
                    'https://i.imgur.com/1r1YifH.png',
                )

                /* Manage map. */
                this.mapManager()
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

        async addImage(_imageid, _imageUrl) {
            /* Initialize promise. */
            return new Promise((resolve, reject) => {
                /* Load image. */
                this.map.loadImage(_imageUrl, (err, image) => {
                    // console.log('ERROR', err)
                    // console.log('IMAGE', image)

                    if (err) {
                        return reject(err)
                    }

                    /* Add image to map. */
                    this.map.addImage(_imageid, image)

                    return resolve(image)
                })
            })
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
                // cat: 'atm',
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
            // console.log('VENDORS:', vendors)

            /* Validate vendors. */
            if (vendors) {
                /* Send vendors back home. */
                this.$emit('onUpdate', vendors)

                /* Clear vendors. */
                this.vendors = []

                vendors.forEach(vendor => {
                    /* Initialize display. */
                    let address = ''
                    let display
                    let lastTxTime
                    let mapLink
                    let name
                    let storefront
                    let summary

                    if (vendor.name) {
                        name = vendor.name
                    } else if (vendor.companyName) {
                        name = vendor.companyName
                    }

                    if (vendor.media && vendor.media.storefront) {
                        storefront = vendor.media.storefront
                    } else {
                        storefront = 'https://i.imgur.com/cCEY2PM.png'
                    }

                    if (vendor.summary) {
                        summary = vendor.summary
                    } else {
                        summary = 'not available'
                    }

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

                    if (address) {
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
                    }

                    const cryptos = `BCH, BTC, DASH`

                    const lastTxCurrency = 'BITCOIN'

                    // const lastTxTime = '8'
                    const lastTxTimeDetail = ''

                    if (vendor.updated_on) {
                        lastTxTime = moment.unix(vendor.updated_on).fromNow()
                    } else if (vendor.updatedAt) {
                        lastTxTime = moment.unix(vendor.updatedAt).fromNow()
                    } else if (vendor.createdAt) {
                        lastTxTime = moment.unix(vendor.createdAt).fromNow()
                    } else {
                        lastTxTime = 'Unknown'
                    }


                    /* Start building the display. */
                    display = `
                    <div @click="innerClick" class="w-3/12 bg-pink-500 grid grid-cols-5 gap-4 rounded-xl">
                        <div class="col-span-3">
                            <h1 class="text-center text-lg text-gray-800 font-extrabold uppercase leading-5">
                                ${name}
                            </h1>

                            <h3 class="-mt-1 text-center text-xs text-gray-500 font-medium uppercase">
                                ${vendor.category === 'default' ? 'BUSINESS' : Array.isArray(vendor.category) ? vendor.category[0] : vendor.category}
                            </h3>

                            <img class="p-1 border-2 border-gray-300 rounded" src="${storefront}" />

                            <div class="mt-1 pl-2 text-xs">
                                ${summary}
                            </div>
                        </div>

                        <div class="col-span-2">
                            <p class="text-right">
                                <a class="mt-3 leading-3 text-blue-500 text-right hover:underline font-extrabold" href="${mapLink}" target="_blank">
                                    ${address}
                                </a>
                            </p>

                            <p class="mt-2 text-right">
                                <strong>ACCEPTING</strong>
                                <br />${cryptos}
                            </p>

                            <div class="mt-2 text-right">
                                Last <strong>${lastTxCurrency}</strong> Transaction
                                <h2>${lastTxTime} <small>${lastTxTimeDetail}</small></h2>
                            </div>
                        </div>
                    </div>

                    `

                    if (vendor === 'abc') {

                        if (vendor.phone) {
                            display += `<a class="text-blue-500 hover:underline" href="tel:${vendor.phone}">${vendor.phone}</a><br>`
                        }

                        if (vendor.email) {
                            display += `<a class="text-blue-500 hover:underline" href="mailto:${vendor.email}">${vendor.email}</a><br>`
                        }

                        if (vendor.googleBusiness) {
                            display += `<div class="text-center"><a class="text-blue-500 hover:underline text-base font-bold" href="${vendor.googleBusiness}" target="_blank">Google Business (link)</a></div>`
                        }

                        display += '</main>'

                    }

                    /* Add vendor to array. */
                    this.vendors.push({
                        id: vendor._id,
                        cat: vendor.category,
                        isExclusive: vendor.users ? true : false, // FIXME: Is this a sufficient flag.
                        lat: vendor.lat,
                        lng: vendor.lng,
                        latlng: [ vendor.lat, vendor.lng ],
                        display,
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
                            'id': _vendor.id,
                            'category': _vendor.cat,
                            // 'description': _vendor.display,
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

        selectMerchant(_merchantid) {
            alert('clicked merchant - ' + _merchantid)
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
                console.log('POSITION', _position)

                const lat = _position.coords.latitude
                // const lat = 33.945524 // TEMP: ATL (for DEV ONLY)
                // console.log('LAT', lat)

                const lng = _position.coords.longitude
                // const lng = -84.2220694 // TEMP: ATL (for DEV ONLY)
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
.search-box::-webkit-input-placeholder {
    /* color: #b2cde0; */
    color: #efefef;
}
</style>
