<template>
    <main>
        <div class="flex flex-row justify-between">
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

            <img :src="require('@/assets/lottie-files/70445-bitcoin-market.gif')" class="hidden sm:flex w-32 h-32" />
        </div>

        <Categories />

        <section class="mt-5">
            <p>
                Please don't hesitate to reach out to our team for any questions you have or just to give us feedback.
                <a href="mailto:hello@usecash.com" class="text-blue-500 font-bold hover:underline">hello@usecash.com</a>
            </p>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Categories from '@/components/Categories'
import Footer from '@/components/FooterMin'

export default {
    components: {
        Categories,
        Footer,
    },
    data: () => ({
        //
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
