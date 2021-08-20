<template>
    <main>
        <h1>Blank</h1>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters('profile', [
            // 'getSessions',
        ]),
    },
    methods: {
        ...mapActions('profile', [
            // 'addSession',
        ]),

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
