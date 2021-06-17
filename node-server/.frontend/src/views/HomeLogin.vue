<template>
<v-app>
  <default-drawer>
    <template
      v-slot:main
    > 
  <home-login></home-login>
  </template>
  </default-drawer>
</v-app>
</template>

<script>


  export default {
    components: {  
      HomeLogin: () => import(
        /* webpackChunkName: "default-app-bar" */
        '../components/HomeLogin.vue'
      ),
      DefaultDrawer: () => import(
        '../components/Drawer.vue'
      ),
    
    }
  }
</script>
