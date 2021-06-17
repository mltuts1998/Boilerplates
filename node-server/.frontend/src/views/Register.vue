<template>
  <default-drawer>
    <template
      v-slot:main
    >
      <Register />
    </template>
  </default-drawer>
</template>

<script>
  // import Register from '../components/Register'
  export default {

    components: {
       DefaultDrawer: () => import(
        '../components/Drawer.vue'
      ),
       Register: () => import(
        '../components/Register.vue'
      ),
    },
  }
</script>
