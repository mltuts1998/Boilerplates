<template>
   <v-card
        style="max-width:800px;margin:auto;"
    >
        <template>
          <center 
            style="padding:10px;font-size:30px;text-transform:uppercase;"
          >
            Sign Up
          </center>

           <v-divider />
          
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                style="padding:30px;"
            >
                <v-text-field
                v-model="username"
                :rules="nameRules"
                label="Username"
                required
                ></v-text-field>

                <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="First Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Last Name"
                required
                ></v-text-field>


                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                

                <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
                ></v-text-field>

                <v-text-field
                v-model="confirm_password"
                label="Confirm Password"
                :rules="[handlePassword]"
                required
                type="password"
                ></v-text-field>

                <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="validate"
                >
                Register
                </v-btn>

            </v-form>
            </template>
             <DialogAlert />
    </v-card>
</template>

<script>
import { call,sync } from 'vuex-pathify'
export default {
    data:()=>({
      select: null,
      valid: true,
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      confirm_password: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),
    components: {
      DialogAlert :  () => import(
        './DialogAlert.vue'
      ),
    },

    computed:{
      ...sync('userAuthenticate', [
        'dialog',
        'dialogDetail'
      ]),
    },

    methods: {
      ...call('userAuthenticate', [
        'userRegister',
      ]),
      
      validate () {
        let a = this.$refs.form.validate()
        
        if(a) {
          console.log(this.$store.state.userAuthenticate)
          this.userRegister( {
            userName: this.username,
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            password: this.password
          })
          
          .then(res => {
            console.log(res);
            this.$router.push("/login").catch(()=>{});
          })
          
          .catch(err => {
            console.log(err)
            this.dialgDetail =  {
              'heading': 'Instructions',
              details: [
                'username should not be blank',
                'username and email should be unique',
                'email should be valid',
                'password should contain alphabet, number and punctuation',
                'password shouldn\'t match with your name'
              ]
            }
            this.dialog = true;
          })
        }
      },
      handlePassword () {
        if(this.password != this.confirm_password)  {
          return 'Password mismatch'
        }
        return true;
      }
    },
}
  
</script>
