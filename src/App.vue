<template>
    <div id="app">
        <header>
            <h1>Use.cash</h1>

            <div id="nav">
                <router-link to="/">Map</router-link> |
                <router-link to="/add">Submit a Business</router-link>
            </div>
        </header>

        <router-view/>

        <footer>
            Copyright &copy; 2021. Use.cash. All rights reserved.
        </footer>
    </div>
</template>

<script>
// import MVP from '@/components/MVP'

export default {
    components: {
        // MVP,
    }
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
    width: 80vw;
    height: 70px;
}

footer {
    margin: 15px 0;
    font-size: 0.9em;
}

#nav {
    padding: 30px;
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
