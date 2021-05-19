<template>
    <div class=""   >
        <Map />

        <div class="info-boxes">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
        </div>
    </div>
</template>

<script>
import Map from '@/components/Map'

export default {
    components: {
        Map,
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
    border-radius: 5px;
}
</style>
