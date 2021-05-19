<template>
    <div class="container">
        <div class="map"></div>

        <div class="info-boxes">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        msg: String
    }
}
</script>

<style scoped>
.map {
    border: 2pt solid rgba(90, 90, 90, 0.5);
    background-color: rgba(90, 90, 90, 0.1);
    width: 80vw;
    height: 350px;
    border-radius: 25px;
}

.info-boxes {
    margin: 30px 0;
    display: flex;
    width: 80vw;
    justify-content: space-between;
}
.info-boxes div {
    padding: 15px;
    text-align: left;
    border: 1pt solid blue;
    /* margin: 25px; */
    width: 28%;
    border-radius: 25px;
}
</style>
