<template>
    <main class="page-container">
        <!-- <Basic
            v-if="magicUser"
            :magicUser="magicUser"
            :profile="profile"
        /> -->

        <Signin v-if="!magicUser" />

        <Signout v-if="magicUser" />
    </main>
</template>

<script>
/* Import components. */
// import Basic from '@/components/profile/Basic'
import Signin from '@/components/profile/Signin'
import Signout from '@/components/profile/Signout'

export default {
    props: {
        magicUser: Object,
    },
    components: {
        // Basic,
        Signin,
        Signout,
    },
    data: () => ({
        // profileid: null,
        // profile: null,
    }),
    // beforeRouteEnter (to, from, next) {
    //     console.log('BEFORE ROUTER ENTER', to, from);
    //     // getPost(to.params.id, (err, post) => {
    //     //     next(vm => vm.setData(err, post))
    //     // })
    //     if (this) this.init(to)
    //
    //     next()
    // },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    beforeRouteUpdate (to, from, next) {
        console.log('BEFORE ROUTE UPDATE (profile)', to, from);
        // this.post = null
        // getPost(to.params.id, (err, post) => {
        //     this.setData(err, post)
        //     next()
        // })

        // if (this) this.init(to)

        next()
    },
    computed: {
        //
    },
    methods: {
        // init(_route) {
        //     this.profileid = null
        //     this.profile = null
        //
        //     const route = _route || this.$route
        //     console.log('ROUTE', route)
        //
        //     if (route) {
        //         const params = route.params
        //         console.log('PARAMS', params)
        //
        //         const sessions = this.getSessions
        //         console.log('SESSIONS (profile)', sessions)
        //
        //         if (params && params.pathMatch) {
        //             this.profileid = params.pathMatch
        //
        //             if (this.profileid === 'homemade-crypto') {
        //                 this.profile = {
        //                     id: 'homemade-crypto',
        //                     name: `Homemade Crypto`,
        //                     email: 'info@homemadecrypto.com',
        //                 }
        //             }
        //             if (this.profileid === 'marc') {
        //                 this.profile = {
        //                     id: 'marc',
        //                     name: `Marc Falzon`,
        //                     email: 'marc@falzon.co',
        //                     avatar: 'https://i.imgur.com/enD1jUY.png',
        //                 }
        //             }
        //             if (this.profileid === 'nyusternie') {
        //                 this.profile = {
        //                     id: 'nyusternie',
        //                     name: `Shomari`,
        //                     email: 'nyusternie@sdot.io',
        //                     avatar: 'https://pbs.twimg.com/profile_images/617458563/profile5_400x400.jpg',
        //                     twitter: 'ShomariPrince',
        //                     merchants: [
        //                         'homemade-crypto',
        //                         'atlanta-bitcoin-club',
        //                     ],
        //                 }
        //             }
        //             if (this.profileid === 'satoshi') {
        //                 this.profile = {
        //                     id: 'satoshi',
        //                     name: `Satoshi Nakamoto`,
        //                     email: 'satoshi@bitcoin.com',
        //                 }
        //             }
        //
        //
        //         }
        //     }
        //
        // },
    },
    created: function () {
        // console.log('CREATED (profile)');

        // this.init()
    },
    mounted: function () {
        // console.log('MOUNTED (profile)');
    },
}
</script>
