<template>
    <main class="">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
                Merchants
            </h1>

            <p class="mt-1 text-sm text-gray-500">
                List of all the merchant profiles
            </p>
        </div>

        <div class="my-3 -mx-6">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                <div class="shadow overflow-x-visible border-b border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">

                            <tr v-for="merchant of merchants" :key="merchant.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img
                                                class="h-10 w-10 rounded-full"
                                                src="https://i.imgur.com/CWca7ZC.png"
                                                alt=""
                                            />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{merchant.name}}
                                            </div>
                                            <div class="text-sm text-gray-500 uppercase">
                                                {{merchant.category}}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{merchant.streetAddress}}</div>
                                    <div class="text-sm text-gray-500">{{merchant.city}} {{merchant.state}}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Default
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="javascript://" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import gravatar from 'gravatar'
import superagent from 'superagent'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    data: () => ({
        merchants: null,
    }),
    methods: {
        async init() {

            const result = await superagent
                .post(`${API_ENDPOINT}/admin/merchants`)
                .set('authorization', `Bearer ${this.didToken}`)
                // .send(merchant)
                .set('accept', 'json')
            console.log('MERCHANTS RESULT', result)

            if (result && result.body) {
                const body = result.body
                console.log('BODY', body)

                this.merchants = body
            }

        },

        avatar(_email) {
            return gravatar.url(_email)
        },

    },
    created: function () {
        this.init()
    },
    mounted: function () {
        //
    },
}
</script>
