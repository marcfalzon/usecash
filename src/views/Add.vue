<template>
    <div class="container">
        <h1>Submit a Business</h1>

        <p class="description">
            Submit information about your business below.
            Your business page will be visible in search results and has an 'Unverified' status.
            Our moderators will inspect the page within 1 - 3 working days and change the status to 'Verified', if all information has been added correctly.
        </p>

        <v-form>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-text-field
                            v-model="message4"
                            label="Company Title"
                            placeholder="Enter your company name"
                            outlined
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-text-field
                            v-model="message4"
                            label="Short Description"
                            placeholder="Short description of your business which appears in the search results"
                            outlined
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-text-field
                            v-model="message4"
                            label="Website Address"
                            placeholder="https://website-address.com"
                            outlined
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-text-field
                            v-model="message4"
                            label="Select Category"
                            placeholder="Choose your business category"
                            outlined
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-textarea
                            counter
                            outlined
                            label="Full Description"
                            placeholder="Please enter a detailed description of your buinses which will be seen on the company page."
                            :rules="rules"
                            :value="description"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        <v-btn
                            x-large
                            color="success"
                            dark
                        >
                            Submit
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
export default {
    data: () => ({
        rules: [v => v.length <= 200 || 'Max 200 characters'],
        description: '',
    }),
}
</script>

<style scoped>
.container {
    width: 80vw;
}

.description {
    padding: 0 300px 0 30px;
}
</style>
