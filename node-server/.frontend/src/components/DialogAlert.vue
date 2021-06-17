
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
    >

      <v-card>
        <v-card-title class="headline primary"
            style="text-transform:uppercase; color:white"
        >
            {{ dialogDetail.heading }}
        </v-card-title>


        <v-card-text
            style="text-align:justify;"
        >
            <v-list-item-group
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in dialogDetail.details"
                    :key="i"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="item"
                            style="font-size:15px;margin:5px;text-transform:capitalize;"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
         </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'

  export default {
    data () {
      return {
     
      }
    },
    computed: {
      ...sync('userAuthenticate', [
        'dialog',
        'dialogDetail',
      ]),
      
    },
    methods: {
           
    }
  }
</script>