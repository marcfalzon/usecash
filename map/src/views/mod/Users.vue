<template>
    <main class="">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
                Users
            </h1>

            <p class="mt-1 text-sm text-gray-500">
                List of all the user profiles
            </p>
        </div>

        <div class="mt-8 flex flex-col">
            <div class="-my-2 overflow-x-auto">
                <div class="inline-block min-w-full py-2 align-middle">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="user of users" :key="user.address">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                        <div class="flex items-center">
                                            <div class="h-10 w-10 flex-shrink-0">
                                                <img
                                                    class="h-10 w-10 rounded-full"
                                                    :src="avatar(user.email)"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900">{{user.email}}</div>
                                                <div class="text-xs text-gray-500">{{user.address}}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div class="text-gray-900">Front-end Developer</div>
                                        <div class="text-gray-500">Optimization</div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a>
                                    </td>
                                </tr>

                                <!-- More people... -->
                            </tbody>
                        </table>
                    </div>
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
        users: null,
    }),
    methods: {
        async init() {

            const result = await superagent
                .post(`${API_ENDPOINT}/admin/users`)
                .set('authorization', `Bearer ${this.didToken}`)
                // .send(merchant)
                .set('accept', 'json')
            // console.log('USERS RESULT', result)

            if (result && result.body) {
                const body = result.body
                console.log('BODY', body)

                this.users = body
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
