<template>
    <v-app id="app">
        <header>
            <h1>Use.cash</h1>

            <div id="nav">
                <router-link to="/">Map</router-link> |
                <router-link to="/add">Submit a Business</router-link>
            </div>
        </header>

        <v-main>
            <router-view />
        </v-main>

        <footer>
            Copyright &copy; 2021. Use.cash. All rights reserved.

            <router-link to="/mod">Mod</router-link>
        </footer>
    </v-app>
</template>

<script>
// import MVP from '@/components/MVP'

export default {
    components: {
        //
    },
    data: () => ({
      //
    }),
}
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
