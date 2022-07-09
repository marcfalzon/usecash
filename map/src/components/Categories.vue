<template>
    <main class="mt-5 p-3 border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-lg">
        <h1 class="my-1 text-xl text-yellow-700 font-bold text-center opacity-30">
            CATEGORY FILTER
        </h1>

        <h1 class="sm:hidden text-base text-gray-700 font-bold">
            Discover where to spend your Bitcoin Cash <strong class="text-yellow-700">ANYWHERE</strong> in the world:
        </h1>

        <h1 class="hidden sm:block text-lg text-gray-700 font-bold">
            Discover where to spend your Bitcoin Cash <strong class="text-yellow-700">ANYWHERE</strong> in the world.
            Choose from multiple categories below:
        </h1>

        <div class="mt-3 ml-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.atm" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    ATM &amp; Vending Machine
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.attraction" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Attraction or Point-of-Interest
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.cafe" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Café
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.food" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Food &amp; Dining
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.grocery" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Grocery &amp; Farmers Market
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.lodging" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Hotels &amp; Lodging
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.nightlife" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Nightlife &amp; Bars
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.services" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Professional Services
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.shopping" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Shopping
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.sports" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Sports &amp; Outdoor
                </span>
            </div>

            <div class="flex flex-row items-center">
                <input type="checkbox" v-model="filter.transport" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                <span class="ml-3 text-gray-800 font-medium truncate">
                    Transportation
                </span>
            </div>

        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        filter: null,
    }),
    watch: {
        filter: {
            handler(_cat){
                // console.log('NEW CATEGORY FILTER', _cat)
                this.$emit('updateCat', _cat)
            },
            deep: true
        },
    },
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        this.filter = {
            atm: false,
            attraction: false,
            cafe: false,
            food: false,
            grocery: false,
            lodging: false,
            nightlife: false,
            services: false,
            shopping: false,
            sports: false,
            transport: false,
        }
    },
    mounted: function () {
        //
    },
}
</script>
