<template>
    <main class="w-full">
        <!-- Profile section -->
        <div class="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
                <h1 class="text-xl leading-6 font-medium text-gray-900">Database Tools</h1>
                <p class="mt-1 text-sm text-gray-500">
                    A set of useful tools for managing the datastore.
                </p>
            </div>

            <div class="mt-6 flex flex-col lg:flex-row">
                <div class="flex-grow space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">
                            Database Location
                        </label>
                        <div class="mt-1 rounded-md shadow-sm flex">
                            <span class="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                elasticsearch
                            </span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="root@127.0.0.1"
                                class="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none sm:text-sm border-gray-300"
                            />
                            <span class="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                port:9200
                            </span>
                        </div>
                        <p class="mt-2 text-sm text-gray-500">
                            NOTE: Elasticsearch is currently the DEFAULT datastore.
                        </p>
                    </div>

                    <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">
                            Database query
                        </label>

                        <select
                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            v-model="selectedQuery"
                        >
                            <option value="" disabled>Please choose one:</option>
                            <option value="stats">Display database statistics</option>
                            <option value="merchants" selected>Select all merchants</option>
                            <option value="users">Select all users</option>
                            <option value="adv">Run advanced (geo) query</option>
                        </select>

                        <div class="mt-1">
                            <textarea :value="displayQuery" rows="4" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                        </div>

                        <p class="mt-2 text-sm text-gray-500">
                            NOTE: Consider using
                            <a href="https://www.elastic.co/kibana/" target="_blank"><strong>
                                Kibana
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </strong></a>
                            for a full set of advanced features.
                        </p>
                    </div>
                </div>

            </div>

            <div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
                <button
                    type="button"
                    class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="ml-5 bg-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    Run query
                </button>
            </div>

            <!-- <div class="mt-6 grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-6">
                    <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autocomplete="family-name"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>

                <div class="col-span-12">
                    <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                    <input type="text" name="url" id="url" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        autocomplete="organization"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>
            </div> -->
        </div>

        <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="relative z-0 inline-flex shadow-sm rounded-md -space-x-px">
                    <button
                        type="button"
                        class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <span class="sr-only">Edit</span>
                        <!-- Heroicon name: solid/pencil -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <span class="sr-only">Attachment</span>
                        <!-- Heroicon name: solid/paper-clip -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <span class="sr-only">Annotate</span>
                        <!-- Heroicon name: solid/annotation -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </span>
            </div>
        </div>
        <!-- <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="px-2 bg-white text-sm text-gray-500">
                    Query options
                </span>
            </div>
        </div> -->

        <!-- Privacy section -->
        <!-- <div class="pt-6 divide-y divide-gray-200"> -->
        <div class="pt-6">
            <div class="px-4 sm:px-6">
                <!-- <div>
                    <h2 class="text-lg leading-6 font-medium text-gray-900">Query Options</h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Customize your query options.
                    </p>
                </div> -->
                <ul class="mt-2 divide-y divide-gray-200">
                    <li class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <p class="text-sm font-medium text-gray-900" id="privacy-option-2-label">
                                Make account private
                            </p>
                            <p class="text-sm text-gray-500" id="privacy-option-2-description">
                                Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                            </p>
                        </div>
                        <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                        <button
                            type="button"
                            class="bg-blue-500 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            role="switch"
                            aria-checked="false"
                            aria-labelledby="privacy-option-2-label"
                            aria-describedby="privacy-option-2-description"
                        >
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                    </li>
                    <li class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <p class="text-sm font-medium text-gray-900" id="privacy-option-3-label">
                                Allow commenting
                            </p>
                            <p class="text-sm text-gray-500" id="privacy-option-3-description">
                                Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                            </p>
                        </div>
                        <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                        <button
                            type="button"
                            class="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            role="switch"
                            aria-checked="true"
                            aria-labelledby="privacy-option-3-label"
                            aria-describedby="privacy-option-3-description"
                        >
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                    </li>
                    <li class="py-4 flex items-center justify-between">
                        <div class="flex flex-col">
                            <p class="text-sm font-medium text-gray-900" id="privacy-option-4-label">
                                Allow mentions
                            </p>
                            <p class="text-sm text-gray-500" id="privacy-option-4-description">
                                Adipiscing est venenatis enim molestie commodo eu gravid
                            </p>
                        </div>
                        <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                        <button
                            type="button"
                            class="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            role="switch"
                            aria-checked="true"
                            aria-labelledby="privacy-option-4-label"
                            aria-describedby="privacy-option-4-description"
                        >
                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                            <span aria-hidden="true" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    </main>
</template>

<script>
export default {
    data: () => ({
        query: null,
        selectedQuery: null,
    }),
    computed: {
        displayQuery() {
            // console.log('this.selectedQuery', this.selectedQuery);
            if (this.selectedQuery === 'stats') {
                return 'loading stats...'
            } else if (this.selectedQuery === 'merchants') {
                return `
GET merchants/_search?track_total_hits=true
{
  "timeout": "2s",
  "query": {
    "match_all": {}
  }
}
                `.trim()
            } else if (this.selectedQuery === 'users') {
                return `
GET users/_search?track_total_hits=true
{
  "timeout": "2s",
  "query": {
    "match_all": {}
  }
}
                `.trim()
            } else if (this.selectedQuery === 'adv') {
                return `
GET geo/_search?track_total_hits=true
{
  "from": 0,
  "size": 100,
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "fields": ["place", "state", "provinceCounty"],
            "query": "Caracas",
            "type": "phrase_prefix"
          }
        },
        {
          "multi_match": {
            "fields": ["country"],
            "query": "Venezuela",
            "type": "phrase_prefix"
          }
        }
      ]
    }
  }
}
                `.trim()
            } else {
                return 'loading...'
            }
        }
    },
    methods: {
        // handleQuerySelect(_query) {
        //     console.log('QUERY', _query)
        //     alert(_query)
        // },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
