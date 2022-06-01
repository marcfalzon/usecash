<template>
    <main>
        <div class="flex py-6 px-4 items-center justify-center">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <img
                        class="mx-auto w-24"
                        src="@/assets/bitcoin-cash-bch-logo.png"
                        alt="Bitcoin Logo"
                    >

                    <h2 class="mt-6 text-center text-gray-900">
                        <span class="text-4xl font-extrabold">Use Cash</span>
                        <span class="text-2xl font-bold block">Account Signin</span>
                    </h2>

                    <p class="mt-2 text-center text-xl text-gray-600">
                        Don't trust, verify!
                    </p>

                    <p class="mt-2 text-center text-base text-gray-600">
                        Your private info is 100% encrypted on your local device by <a href="https://magic.link/docs/introduction/security" target="_blank" class="text-blue-500 font-bold hover:underline">Magic</a>.
                    </p>
                </div>

                <section class="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true">

                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">Email address</label>

                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-lg rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                placeholder="Enter your email address"
                                v-model="email"
                            >
                        </div>
                    </div>

                    <button @click="signin" class="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="h-5 w-5 text-indigo-100 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>

                        <span class="text-xl ml-3">
                            Request Auth Link
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
        signin() {
            /* Request login. */
            this.$store.dispatch('signin', {
                email: this.email.toLowerCase(),
            })
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
