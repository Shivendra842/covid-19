import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedStateCaseTally:{}
  },
  mutations: {
    setTally: (state,value) =>{
      state.selectedStateCaseTally=value;
    }
  },
  actions: {
    actionSetTally:({commit},value) =>{
      commit('setTally',value);
    }
  },
  getters:{
    casesTally:(state)=>state.selectedStateCaseTally,
  },
  modules: {
  }
})
