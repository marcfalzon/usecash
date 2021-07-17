<template>
    <main class="page-container">
        <Details v-if="profileid" />
        <Signin v-if="!profileid" />
    </main>
</template>

<script>
/* Import components. */
import Details from '@/components/profile/Details'
import Signin from '@/components/profile/Signin'

export default {
    components: {
        Details,
        Signin,
    },
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
