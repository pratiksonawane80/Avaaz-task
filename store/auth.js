// export const state = () => ({
//   JSESSIONID: ''
// })

// export const mutations = {
//   setCookie(state, payload) {
//     state.JSESSIONID = payload
//   },
// }

// export const getters = {}

// export const actions = {
//   setInitailLoggedIn({ commit }, obj) {
//     commit('setCookie', obj.JSESSIONID)
//   },

//   async doLogin({commit}, data) {
//     return await this.$login(data).then((data) => {
//       const now = new Date()
//       now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
//       this.$cookies.set('JSESSIONID', data.payload.session_id, {
//         path: '/',
//         expires: now,
//       })
//       commit('setInitailLoggedIn', this.$cookies.get('JSESSIONID'))
//     })
//   },

// }
