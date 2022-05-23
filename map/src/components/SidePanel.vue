<template>
    <main class="relative z-10" role="dialog" aria-modal="true">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 bg-blue-500 opacity-80"></div>

        <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <!--
              Slide-over panel, show/hide based on slide-over state.

              Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
                    <div class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700" :class="ani">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div class="px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <div class="flex flex-row gap-2 items-center">
                                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd"></path></svg>

                                        <h2 id="slide-over-heading" class="text-xl font-medium text-gray-500">
                                            Map Guide
                                        </h2>
                                    </div>

                                    <div class="ml-3 flex h-7 items-center">
                                        <button @click="$emit('toggleMenu')" type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                            <span class="sr-only">Close panel</span>
                                            <!-- Heroicon name: outline/x -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Header
                                :isPanelOpen="isPanelOpen"
                            />

                            <router-view />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* Import components. */
import Header from '@/components/Header'

export default {
    props: {
        isPanelOpen: Boolean,
    },
    components: {
        Header,
    },
    data: () => ({
        ani: null,
    }),
    watch: {
        isPanelOpen: function (_isOpen) {
            if (_isOpen) {
                setTimeout(() => {
                    this.ani = 'translate-x-0'
                }, 10)
            } else {
                setTimeout(() => {
                    this.ani = 'translate-x-full'
                }, 10)
            }
        }
    },
    created: function () {
        // this.ani = 'translate-x-0'
        this.ani = 'translate-x-full'
    },
}
</script>

<style scoped>
/*  */
</style>
