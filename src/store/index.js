import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  movie_id: 'hah'
}

const mutations = {
  sendMovieID (state, args) {
    console.log(args.movieID)
    state.movie_id = args.movieID
  }
}

const actions = {
  sendMovieID: ({ commit }, args) => commit('sendMovieID', args)
}

const getters = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
