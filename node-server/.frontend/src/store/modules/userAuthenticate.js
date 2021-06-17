import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { make } from 'vuex-pathify'

Vue.use(Vuex)

const state = {
    URL: "http://localhost:5000/",
    user: null,
    dialog: false, 
    dialogDetail: {
      "heading": "Instructions",
      "details": [
        "Hi"
      ]
    },
    userName:"Anonymous",
    message: "Hey!",
    selectedItem: null,
    isLoggedin: (localStorage.getItem('access_token') ? true: false)
}

  
const mutations = make.mutations(state)

const actions = {
    ...make.actions(state),
    userRegister : async ({commit, state}, data) => {
        console.log(commit)
        let res = await axios.post(state.URL + 'api/auth/signup', data)
        return res.data;
    },

    userLogin : async ({commit, state}, data) => {
        console.log(commit)
        console.log(data);
        let res = await axios.post(state.URL + 'api/auth/signin', data)
        res = res.data;
        localStorage.setItem("access_token", "Bearer " + res.access_token);
        return res;
    },
}

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}



