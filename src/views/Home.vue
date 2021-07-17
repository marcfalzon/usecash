<template>
    <div class="">
        <Search id="search" />

        <Map id="map" />

        <InfoBoxes id="info-boxes" />

        <div class="bg-gray-50">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span class="block">Ready to dive in?</span>
                    <span class="block text-indigo-600">Start your free trial today.</span>
                </h2>

                <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div class="inline-flex rounded-md shadow">
                        <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            Get started
                        </a>
                    </div>

                    <div class="ml-3 inline-flex rounded-md shadow">
                        <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
        </div>

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
    z-index: 1000;
}

#map {
    margin-top: 30px;
    margin: 30px 15px 0;
}
</style>
