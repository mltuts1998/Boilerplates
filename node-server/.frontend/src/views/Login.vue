<template>
  <default-drawer
  >
    <template
      v-slot:main
    >
      <Login />
    </template>
  </default-drawer>
</template>

<script>
  export default {
    components: {
       DefaultDrawer: () => import(
        '../components/Drawer.vue'
      ),
       Login: () => import(
        '../components/Login.vue'
      ),
    },
  }
</script>
