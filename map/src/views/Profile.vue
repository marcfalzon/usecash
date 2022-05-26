<template>
    <main class="px-3">
        <Basic
            v-if="magicUser"
            :magicUser="magicUser"
            :profile="profile"
        />

        <Signin v-if="!magicUser" />
    </main>
</template>

<script>
/* Import modules. */
import gravatar from 'gravatar'
import superagent from 'superagent'

/* Import components. */
import Basic from '@/components/profile/Basic'
import Signin from '@/components/profile/Signin'

const API_ENDPOINT = `https://api.usecash.com/v1`
// const API_ENDPOINT = `http://localhost:9090/v1`

export default {
    props: {
        magicUser: Object,
    },
    components: {
        Basic,
        Signin,
    },
    data: () => ({
        // profileid: null,
        profile: null,
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
    watch: {
        magicUser: function (_user) {
            if (_user) {
                console.log('MAGIC USER CHANGED', _user)
                this.init()
            }

        }
    },
    computed: {
        //
    },
    methods: {
        async init() {
            console.log('BASIC (magicUser):', this.magicUser)
            this.gravatarUrl = gravatar.url(this.magicUser.email)

            const result = await superagent
                .get(`${API_ENDPOINT}/users/${this.magicUser.publicAddress}`)
                .catch(err => console.error(err))
            // console.log('USER RESULT', result)

            if (result && result.body) {
                let body = result.body
                console.log('BODY', body)

                this.profile = body
            }
        },

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
