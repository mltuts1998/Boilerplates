<template>
<v-app>
  <default-drawer>
    <template
      v-slot:main
    >  
      <h1>User Profile helllsad</h1>
    </template>
  </default-drawer>
</v-app>
</template>

<script>


  export default {
    name : 'Profile',
    components: {  
      DefaultDrawer: () => import(
        '../components/Drawer.vue'
      ),
    }
  }
</script>
