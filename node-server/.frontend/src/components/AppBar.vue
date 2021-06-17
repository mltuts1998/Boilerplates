<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="70"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <default-drawer-toggle class="hidden-sm-and-down" />

    <v-toolbar-title
      class="font-weight-light text-h5"
    > Hello {{ userName }}</v-toolbar-title>

    <v-spacer />

    <default-search class="hidden-sm-and-down" />

    <default-go-home />

    <template v-if="!isLoggedin">
        <app-btn
          class="text-none ma-2"
          color="secondary"
          @click="$router.push('/login')"
        >
          <v-icon left>
            mdi-login
          </v-icon>

          Login
        </app-btn>

        <app-btn
          class="text-none ma-2"
          color="secondary"
          @click="$router.push('/register')"
        >
          <v-icon left>
            mdi-account
          </v-icon>

          mdi-account
        </app-btn>
    </template>
    <template v-else>
      <default-notifications />
      <default-account />
    </template>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'
  import DefaultDrawerToggle from './widgets/DrawerToggle.vue'
  export default {
    name: 'DefaultBar',

    components: {
      DefaultAccount: () => import(
        /* webpackChunkName: "default-account" */
        './widgets/Account'
      ),
      DefaultDrawerToggle: DefaultDrawerToggle, 
    
      DefaultGoHome: () => import(
        /* webpackChunkName: "default-go-home" */
        './widgets/GoHome'
      ),
      DefaultNotifications: () => import(
        /* webpackChunkName: "default-notifications" */
        './widgets/Notifications'
      ),
      DefaultSearch: () => import(
        /* webpackChunkName: "default-search" */
        './widgets/Search'
      ),
      AppBtn: () => import(
        /* webpackChunkName: "default-list" */
        './app/Btn.vue'
      ),
    },

    computed: {
      ...sync('app', [
        'drawer',
        'mini',
      ]),
      ...sync('userAuthenticate', [
        'isLoggedin',
        'userName'
      ]),
    },
  }
</script>
