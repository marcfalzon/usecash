<template>
    <footer>
        <div>
            Copyright &copy; {{curYear}}. Use.cash. All rights reserved.
        </div>

        <div class="hidden sm:block">
            Built and maintained by <a href="https://modenero.com/" target="_blank">Modenero</a>
        </div>
    </footer>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    props: {
        //
    },
    computed: {
        curYear() {
            return moment().format('YYYY')
        },
    },
    data: () => ({
        //
    }),
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
footer {
    display: flex;
    justify-content: space-between;
}

div {
    font-size: 1.0em;
    padding: 0 15px;
}
div a {
    font-size: 1.0em;
}
</style>
