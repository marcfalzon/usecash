<template>
    <main>
        <Header :isMenuOpen="isMenuOpen" @openMenu="openMenu" />

        <router-view :isMenuOpen="isMenuOpen" @closeMenu="closeMenu" />

        <Footer />
        <Modals />
        <Notifs />
    </main>
</template>

<script>
import Footer from '@/components/Footer2'
import Header from '@/components/Header'
import Modals from '@/components/Modals'
import Notifs from '@/components/Notifs'

export default {
    components: {
        Footer,
        Header,
        Modals,
        Notifs,
    },
    data: () => ({
        isMenuOpen: null,
    }),
    methods: {
        openMenu() {
            // console.log('OPEN MENU');
            this.isMenuOpen = true
        },

        closeMenu() {
            // console.log('CLOSE MENU');
            this.isMenuOpen = false
        },
    },
    created: function () {
        this.isMenuOpen = false
    },
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

    overflow-y:scroll;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80vw;
    height: 70px;
    padding: 0 15px;
}

footer {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    font-size: 0.9em;
}
footer a {
    text-decoration: none;
    font-size: 0.8em;
}

h1 {
    font-size: 1.5em !important;
    margin-bottom: 5px !important;
}

#nav {
    /* padding: 30px; */
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.page-container {
    padding: 15px;
}
</style>
