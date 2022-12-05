<!-- Please remove this file from your project -->
<template>
  <div class="text-center m-10">
    <h1 class="text-3xl font-bold">LOGIN</h1>
    <div class="border-2 p-8">
      <div>
        <label for="basic-url" class="">User Name</label>
        <input
          v-model="userName"
          class="m-5 p-3 border"
          type="text"
          placeholder="Enter User Name"
        />
      </div>
      <div>
        <label for="basic-url">Password</label>
        <input
          v-model="password"
          class="m-5 p-3 border"
          type="password"
          placeholder="Enter Password"
        />
      </div>
      <div class="text-center mt-5">
        <button
          type="button"
          class="
            bg-transparent
            hover:bg-blue-500
            text-blue-700
            font-semibold
            hover:text-white
            py-2
            px-4
            border border-blue-500
            hover:border-transparent
            rounded
          "
          @click="userLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      baseUrl: this.$config.axios.browserBaseURL,
      userName: '',
      password: '',
    }
  },

  computed: {
  },

  created() {},

  methods: {
    userLogin() {
      const requestUrl =  this.baseUrl + 'users/auth'
      const username = this.userName // get from the input box
      const password = this.password // get from the input box

      const cookies = this.$cookies
      const basicAuthCredentials = 'Basic ' + btoa(username + ':' + password)
      const that = this
      this.$axios
        .post(
          requestUrl,
          {},
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: basicAuthCredentials,
            },
          }
        )
        .then(function (response) {
          if (response.data.status === 'login') {
            cookies.set('AUTHTOKEN', response.data.auth_token)
            cookies.set('JSESSIONID', response.data.session_id)
            that.$router.push('/redirect')
          } else {
            alert('Incorrect User ID or Password entered')
          }
        })
        .catch(function (error) {
          console.log('Error on Authentication', error)
          alert('Incorrect User ID or Password entered')
        })
    },
  },
}
</script>
