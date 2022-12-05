// export default ($axios) => {
//   return {
//     login: async (data) => {
//       return await $axios
//         .post('users/auth/', data)
//         .then((response) => {
//           return response.data.auth_token
//         })
//         .catch((e) => {
//           return { status: e.response.status, data: e.response.data }
//         })
//     },
//   }
// }
