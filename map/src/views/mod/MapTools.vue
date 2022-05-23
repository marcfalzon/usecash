<template>
    <main class="w-full">
        <!-- Profile section -->
        <div class="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
                <h1 class="text-lg font-medium text-gray-900">Map Tools</h1>
            </div>

            <Flipstarter />
        </div>

    </main>
</template>

<script>
/* Import components. */
import Flipstarter from '@/components/Flipstarter'

export default {
    components: {
        Flipstarter,
    },
    data: () => ({
        //
    }),
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
