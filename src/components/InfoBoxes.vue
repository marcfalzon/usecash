<template>
    <div class="container">
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
export default {
    props: {
        msg: String
    }
}
</script>

<style scoped>
.info-boxes {
    margin: 30px 0;
    padding: 0 15px;
    display: flex;
    width: 80vw;
    justify-content: space-between;
}
.info-boxes div {
    padding: 15px;
    text-align: left;
    border: 1pt solid blue;
    /* margin: 25px; */
    width: 30%;
    border-radius: 5px;
}
</style>
