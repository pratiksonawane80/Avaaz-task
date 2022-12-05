export const state = () => ({
  usersList: []
})

export const mutations = {
  setUsersList(state, payload) {
    state.usersList = payload
  },
}

export const getters = {}

export const actions = {
  fetchUsersList({commit}) {
    return this.$getUsersList().then((payload) => {
      commit('setUsersList', payload.data)
      console.log(state.usersList, 'lisssssssssstttttttttt');
      return payload.data
    })
  }
}
