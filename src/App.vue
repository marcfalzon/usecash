<template>
    <v-app>
        <Header />

        <v-main>
            <router-view />
        </v-main>

        <Footer />
    </v-app>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
    components: {
        Footer,
        Header,
    },
    data: () => ({
      //
    }),
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
</style>
