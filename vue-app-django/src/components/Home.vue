<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      style="height:100vh;position:fixed;width:100%;top:0px;"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1 class="display-1 font-weight-thick mb-4">
            {{ $store.state.ngo_name }}
          </h1>

          <v-img
            width="100"
            style="margin:auto;"
            src="https://raw.githubusercontent.com/jhabarsingh/SIMADIAN/main/doc/trademark.png"
          ></v-img>
          
          <h4 class="subheading">
            {{ $store.state.ngo_title }}
          </h4>

          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="$router.push('/home')"
          >
            Home
            <v-icon
              dark
              right
            >
              mdi-home
            </v-icon>
          </v-btn>
        
        </v-col>
      </v-row>

    </v-parallax>
  </div>  
</template>

<script>
export default {

}

</script>
