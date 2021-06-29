import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peoples: [],
    format: 'table',
    searchText: '',
  },
  mutations: {
    setPeoples(state, p) {
      state.peoples = p
    },
    switchFormat(state, f) {
      state.format = f
    },
    setSearchText(state, t) {
      state.searchText = t
    }
  },
  actions: {
    async fetchPeoples({commit}) {
      try {
        const peoples = await axios.get('/data.json').then(res => res.data);
        commit('setPeoples', peoples)
      } catch (error) {
        console.log(error);
      }
    },
  }, 
})
