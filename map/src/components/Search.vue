<template>
    <main class="py-2 px-3">
        <input
            v-model="search"
            placeholder="Search for a local business..."
            type="text"
            @focus="showMessage = true"
            @blur="showMessage = false"
            name="email-address"
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >

        <div v-if="showMessage" class="px-5 mt-3 text-red-500 font-extrabold">
            NOTICE: Search is coming soon for Use Cash. Help support!
        </div>
    </main>
    <!-- <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a local business..."
        solo
    >
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                    Where would you like to spend your
                    <strong>Bitcoin</strong> today?
                </v-list-item-title>
            </v-list-item>
        </template>

        <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
            >
                <v-icon left>
                    mdi-bitcoin
                </v-icon>
                <span v-text="item.name"></span>
            </v-chip>
        </template>

        <template v-slot:item="{ item }">
            <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
            >
                {{ item.name.charAt(0) }}
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
                <v-icon>mdi-bitcoin</v-icon>
            </v-list-item-action>
        </template>
    </v-autocomplete> -->
</template>

<script>
/* Import modules. */
import superagent from 'superagent'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    data: () => ({
        isLoading: false,
        items: [],
        model: null,
        search: null,
        tab: null,
        showMessage: null,
    }),
    watch: {
        model (_val) {
            if (_val != null) this.tab = 0
            else this.tab = null
        },
        search (_val) {
            console.log('search (val):', _val)

            if (_val) {
                this.handleSearch(_val)
            }
        },
    },
    modules: {
        async handleSearch(_val) {
            console.log('HANDLE SEARCH', _val)

            const result = await superagent
                .get(`${API_ENDPOINT}/search/${_val}`)
                .catch(err => console.error(err))
            console.log('RESULT', result)
        }
    },
    created: function () {
        this.showMessage = false
    },
}
</script>
