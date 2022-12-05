<template>
  <div class="text-center m-5">
    <div>
      <button
        type="button"
        class="
          bg-transparent
          hover:bg-red-500
          text-red-700
          font-semibold
          hover:text-white
          py-2
          px-4
          border border-red-500
          hover:border-transparent
          rounded
          text-3xl
        "
        @click="toggleModal"
      >
        Create User
      </button>
    </div>

    <div class="text-center my-10">
      <h1 class="text-3xl">List of Users</h1>
        <p v-if="loading" class="text-center text-xl m-5" >Loading...</p>
      <table class="min-w-full text-center">
        <thead class="bg-white border-b">
          <tr class="">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in usersData"
            :key="user.id"
            class="bg-gray-100 border-b"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
              <button
                :value="user.id"
                class="
                  bg-transparent
                  hover:bg-red-500
                  text-red-700
                  font-semibold
                  hover:text-white
                  py-2
                  px-4
                  border border-red-500
                  hover:border-transparent
                  rounded
                "
                @click="deleteUser($event)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      id="modal"
      class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
    >
      <div
        class="
          flex
          items-center
          justify-center
          min-height-100vh
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <div
          class="
            inline-block
            align-center
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label>First Name</label>
            <input
              v-model="first_name"
              type="text"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Last Name</label>
            <input
              v-model="last_name"
              type="text"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Phone Number</label>
            <input
              v-model="phone"
              type="tel"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Role</label>
            <input
              v-model="role"
              type="text"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Login Id</label>
            <input
              v-model="login_id"
              type="email"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
          </div>
          <div class="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              class="
                py-2
                px-4
                bg-gray-500
                text-white
                rounded
                hover:bg-gray-700
                mr-2
              "
              @click="toggleModal"
            >
              <i class="fas fa-times"></i> Cancel
            </button>
            <button
              type="button"
              class="
                py-2
                px-4
                bg-blue-500
                text-white
                rounded
                hover:bg-blue-700
                mr-2
              "
              @click="createUser"
            >
              <i class="fas fa-plus"></i> Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UsersPage',
  data() {
    return {
      baseUrl: this.$config.axios.browserBaseURL,
      usersData: [],
      first_name: '',
      login_id: '',
      last_name: '',
      phone: '',
      password: '',
      role: '',
      timezone: '',
      headers: '',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      usersList: (state) => state.users.usersList,
    }),
  },

  mounted() {
    this.getUsersData()
  },
  methods: {
    ...mapActions({
      fetchUsersList: 'users/fetchUsersList',
    }),

    // Get users data
    getUsersData() {
      this.loading = true

      const requestUrl =
        this.baseUrl +
        'users?page=1&per_page=100&query=queue_id:4&include=settings&sort=extension:asc'

      // get data from cookies
      const token = 'Basic ' + btoa(this.$cookies.get('AUTHTOKEN') + ':')
      const jessionId = this.$cookies.get('JSESSIONID')

      const myHeaders = new Headers()
      myHeaders.append('Authorization', token)
      myHeaders.append('Cookie', `JSESSIONID=${jessionId}`)

      this.headers = myHeaders
      console.log(myHeaders)

      const requestOptions = {
        method: 'GET',
        headers: this.headers,
        redirect: 'follow',
      }

      // Call an api
      fetch(requestUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.loading = false
          this.usersData = result
          console.log(result)
        })
        .catch((error) => console.log('error', error))
    },

    toggleModal() {
      document.getElementById('modal').classList.toggle('hidden')
    },

    // TO create User
    createUser() {
      const requestUrl = this.baseUrl + 'users'

      const myHeaders = new Headers()
      myHeaders.append(
        'Authorization',
        `Basic ${btoa(this.$cookies.get('AUTHTOKEN'))}`
      )
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append(
        'Cookie',
        `JSESSIONID=${this.$cookies.get('JSESSIONID')}`
      )

      const raw = JSON.stringify({
        first_name: this.first_name,
        last_name: this.last_name,
        login_id: this.login_id,
        password: this.password,
        role: this.role,
        extension: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        location: 'Default',
        phone: '9404006911',
        user_skills: [1, 2],
      })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      fetch(requestUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.getUsersData()
          this.toggleModal()
          console.log(result)
        })
        .catch((error) => console.log('error', error))
    },

    async deleteUser(e) {
      console.log(e.target.value, 'value')
      const requestUrl =
        this.baseUrl + 'users/' + e.target.value + '/toggle_active'

      const requestOptions = {
        method: 'PUT',
        headers: this.headers,
        redirect: 'follow',
        // body: JSON.stringify(payload),
      }

      const response = await fetch(requestUrl, requestOptions)
      console.log(response, 'respose')
    },
  },
}
</script>
