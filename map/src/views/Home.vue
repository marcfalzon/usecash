<template>
    <main>
        <section class="flex flex-col gap-4">
            <h1 class="text-2xl font-bold">
                Welcome Guest!
            </h1>

            <p>
                Bitcoin Cash is digital cash—that means it’s secure, fast, and low fee.
                It only takes seconds to set up your <a href="https://wallet.bitcoin.com/" target="_blank" class="text-blue-500 font-bold hover:underline">Bitcoin.com wallet</a> to start using Bitcoin Cash.

                <span class="hidden sm:inline">
                    Crypto currencies stand to transform the way business and individuals exchange value, so <a href="https://whybitcoincash.com/" target="_blank" class="text-blue-500 font-bold hover:underline">Why Bitcoin Cash?</a>
                </span>
            </p>
        </section>

        <section class="mt-5 p-3 border-2 bg-yellow-100 border-yellow-300 rounded-lg shadow-lg">
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
                    <input type="checkbox" v-model="filter.shopping" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Shopping
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.professionalServices" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Professional Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.electronics" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Electronics
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.grocery" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Grocery &amp; Farmers Market
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.bar" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Bar
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.auto" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Automotive Shops &amp; Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.cafe" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Café
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.sports" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Sports &amp; Outdoor
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.beauty" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Beauty, Barber &amp; Spas
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.health" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Health &amp; Medical
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.flowerGifts" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Flower &amp; Gifts
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.fastFood" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Fast Food
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.hotels" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Hotels &amp; Hostels
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.homeServices" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Home Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.entertainment" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Entertainment &amp; Media
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.financial" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Financial Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.travel" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Travel &amp; Agency
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.desserts" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Desserts and Bakery
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.cannabis" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Cannabis Dispensaries
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.art" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Arts
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.souvenir" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Souvenir Store
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.publicServices" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Public Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.edu" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Education
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.transportation" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Transportation
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.adult" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Adult Entertainment
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.liquor" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Liquor Store
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.toys" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Toys &amp; Hobbies
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.rentalServices" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Rental Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.foodTruck" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Food Truck &amp; Stands
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.pets" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Pets &amp; Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.taxi" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Taxi Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.bike" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Bike, Scooter and Motorcycle Shop
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.pizza" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Pizza &amp; Sandwiches
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.books" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Books &amp; Magazines
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.cateringServices" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Catering Services
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.eventPlanning" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Event Planning
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.brewery" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Brewery
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.religion" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Religion &amp; Spiritual
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.music" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Music &amp; Video
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.iceCream" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Ice Cream &amp; Frozen Yogurt
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.jewelry" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Jewelry &amp; Watches
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.eventVenue" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Event Venue
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.kids" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Kids
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.miniMarts" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Mini-marts &amp; Convenience Stores
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.nightlife" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Nightlife
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.museum" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Museum
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.comicBooks" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Comic Books
                    </span>
                </div>

                <div class="flex flex-row items-center">
                    <input type="checkbox" v-model="filter.air" class="focus:ring-yellow-500 h-6 w-6 text-yellow-600 border-4 border-yellow-500 rounded" />

                    <span class="ml-3 text-gray-800 font-medium truncate">
                        Airlines &amp; Charters
                    </span>
                </div>
            </div>
        </section>

        <section class="mt-5">
            <p>
                Aute aliquip aut culpa anim aut id id graviterque, non quo summis eram culpa, o
                id despicationes, doctrina fore nulla ea nulla, nisi appellat ab vidisse, export
                distinguantur occaecat illum proident, labore o ne tempor cupidatat.
            </p>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/FooterMin'

export default {
    components: {
        Footer,
    },
    data: () => ({
        filter: null,
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        this.filter = {
            atm: false,
            shopping: false,
            restaurants: false,
            professionalServices: false,
            electronics: false,
            grocery: false,
            bar: false,
            auto: false,
            cafe: false,
            sports: false,
            beauty: false,
            health: false,
            flowerGifts: false,
            fastFood: false,
            hotels: false,
            homeServices: false,
            entertainment: false,
            financial: false,
            travel: false,
            desserts: false,
            cannabis: false,
            art: false,
            souvenir: false,
            publicServices: false,
            edu: false,
            realEstate: false,
            transportation: false,
            adult: false,
            liquor: false,
            toys: false,
            rentalServices: false,
            foodTruck: false,
            pets: false,
            taxi: false,
            bike: false,
            pizza: false,
            books: false,
            cateringServices: false,
            eventPlanning: false,
            brewery: false,
            religion: false,
            music: false,
            iceCream: false,
            jewelry: false,
            eventVenue: false,
            kids: false,
            miniMarts: false,
            nightlife: false,
            museum: false,
            comicBooks: false,
            air: false,
        }

    },
    mounted: function () {
        //
    },
}
</script>
