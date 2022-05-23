<template>
    <main>
        <div class="flex items-center justify-center bg-gray-50 py-10 px-4">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <img
                        class="mx-auto w-32"
                        src="@/assets/bitcoin-cash-bch-logo.png"
                        alt="Bitcoin Logo"
                    >

                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        You are currently signed in
                    </h2>

                    <p class="mt-2 text-center text-base text-gray-600">
                        Don't trust, verify!
                        Your information is 100% encrypted on your local device.
                    </p>
                </div>

                <section class="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true">

                    <button @click="signout" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <!-- Heroicon name: solid/lock-closed -->
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>

                        <span class="text-xl">
                            Sign Out
                        </span>
                    </button>
                </section>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
// import moment from 'moment'

export default {
    props: {
        //
    },
    data: () => ({
        email: null,
    }),
    computed: {
        //
    },
    methods: {
        signout() {
            /* Request login. */
            this.$store.dispatch('logout')
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
