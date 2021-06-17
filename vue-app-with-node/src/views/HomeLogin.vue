<template>
  <Drawer
  >
    <template
      v-slot:main
    >
      <HomeLogin />
    </template>
  </Drawer>
</template>

<script>
  import HomeLogin from '../components/HomeLogin'
  import Drawer from '../components/Drawer.vue'
  export default {

    components: {
      HomeLogin,
      Drawer
    },
  }
</script>
