<template>
    <main>
        <h1>Profile</h1>

        <p class="description">
            PROFILE ID: {{profileid}}
        </p>

    </main>
</template>

<script>
export default {
    data: () => ({
        profileid: null,
    }),
    methods: {
        //
    },
    created: function () {
        const route = this.$route
        console.log('ROUTE', route)

        if (route) {
            const params = route.params
            console.log('PARAMS', params)

            if (params && params.pathMatch) {
                this.profileid = params.pathMatch
            }
        }
    },
    mounted: function () {

    },
}
</script>

<style scoped>
/*  */
</style>
