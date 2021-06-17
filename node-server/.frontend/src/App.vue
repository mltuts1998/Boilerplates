<template>
  <v-app>
      <default-bar />
      <router-view  :key="$route.fullPath" />
  </v-app>
</template>
<script>

export default {
  name: 'App',
  metaInfo: {
      title: 'OldKart',
      titleTemplate: 'OldKart',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },

  data: () => ({
    //
  }),
  components: {  
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './components/AppBar.vue'
      ),
      
    }
};
</script>
