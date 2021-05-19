<template>
    <div class="map"></div>
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
</style>
