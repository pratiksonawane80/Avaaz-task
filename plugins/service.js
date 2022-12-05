import usersList from '~/services/users'

export default ({ $axios }, inject) => {
  const allMethods = {
    ...usersList($axios),
  }
  const methods = Object.keys(allMethods)
  methods.forEach((method) => {
    inject(method, allMethods[method])
  })
}
