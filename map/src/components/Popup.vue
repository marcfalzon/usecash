<template>
    <main class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
        Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-30 transition-opacity"></div>

        <div @click="close" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
                <div @click.stop="noop" class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                    <div class="absolute top-0 right-0 pt-3 pr-3">
                        <button @click="report" type="button" class="flex items-center bg-white rounded-md text-xs text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Report</span>
                            REPORT
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                        </button>
                    </div>

                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-200">
                            <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
                        </div>

                        <div class="mt-3 text-center sm:mt-1 sm:ml-4 sm:text-left">
                            <h1 class="text-2xl sm:text-3xl leading-7 font-medium text-gray-900" id="modal-title">
                                {{name}}

                                <h3 class="block text-sm text-gray-400 uppercase">
                                    {{category}}
                                </h3>
                            </h1>

                            <section class="mt-3 w-full">
                                <div class="grid grid-cols-5 gap-4 rounded-xl">
                                    <div class="col-span-3">
                                        <img class="p-1 border-2 border-gray-300 rounded" src="https://api.usecash.com/v1/media/ba21a841-0c09-4f6c-a5df-f3561b26921b.jpg" />

                                        <div class="mt-1 pl-2 text-xs">
                                            not available
                                        </div>
                                    </div>

                                    <div class="col-span-2">
                                        <p class="text-right">
                                            <a class="mt-3 leading-3 text-blue-500 text-right hover:underline font-extrabold" href="https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=123 Main Street<br>New York, NY 10012<br>" target="_blank">
                                                123 Main Street<br>New York, NY 10012<br>
                                            </a>
                                        </p>

                                        <p class="mt-2 text-right">
                                            <strong>ACCEPTING</strong>
                                            <br />BCH, BTC, DASH
                                        </p>

                                        <div class="mt-2 text-right">
                                            Last <strong>BITCOIN</strong> Transaction
                                            <h2>an hour ago <small></small></h2>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>

                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            @click.stop="doSomething"
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Deactivate
                        </button>

                        <button
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import superagent from 'superagent'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    props: {
        vendorid: String,
    },
    data: () => ({
        name: null,
        category: null,
    }),
    computed: {
        //
    },
    methods: {
        close() {
            this.$emit('close')
        },

        noop() {
            //
        },

        doSomething() {
            alert('doing something')
        },

        report() {
            alert('send email report')
        },

    },
    created: async function () {
        const result = await superagent
            .get(`${API_ENDPOINT}/merchants/${this.vendorid}`)
            .catch(err => console.error(err))
        // console.log('POPUP VENDOR (result):', result)

        if (result && result.body) {
            const body = result.body
            console.log('POPUP BODY', body)

            this.name = body.name
            this.category = body.category
        }

    },
    mounted: function () {
        //
    },
    beforeDestroy: function () {
        console.log('TODO: DO POPUP CLEANUP!')
    },
}
</script>
