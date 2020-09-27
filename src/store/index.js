import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    password: '',
    idToken: '',
    company_name: '',
    printMode: true
  },
  getters: {
    loggedIn: (state) => {
      return Boolean(state.idToken.trim())
    },
    idToken: (state) => {
      return state.idToken
    },
    company_name: (state) => {
      return state.company_name
    },
    printMode: (state) => {
      return state.printMode
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateCompanyNanem(state, company_name) {
      state.company_name = company_name;
    },
    updateprintMode(state, printMode) {
      state.printMode = printMode;
    },
  },
  actions: {},
  plugins: [createPersistedState({
    key: 'houseqr',
    storage: window.localStorage
  })]
})