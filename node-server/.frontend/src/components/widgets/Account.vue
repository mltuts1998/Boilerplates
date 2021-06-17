<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
        <app-bar-item>
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </app-bar-item>
     
    </v-list>
  </v-menu>
</template>

<script>
import { sync } from 'vuex-pathify'
  export default {
    name: 'DefaultAccount',

    data: () => ({
      
    }),
    components : {
      AppBarItem: () => import(
        '../app/BarItem.vue'
      ),
    },
     computed:{
      ...sync('userAuthenticate', [
        'dialog',
        'dialogDetail',
        'isLoggedin',
        'userName'
      ]),
    },
    methods:{
      logout(){
        console.log('logout')
        localStorage.clear();
        this.isLoggedin = false;
        this.dialog = false;
        this.userName = "Anonymous";
        
        this.$router.push('/home').catch(()=>{});
      }
    }
  }
</script>
