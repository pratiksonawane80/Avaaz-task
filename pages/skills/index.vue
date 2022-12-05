<template>
  <div class="text-center mt-10">
    <div>
      <button
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
        Create Skills
      </button>
    </div>

    <div class="m-12 text-xl">
      <h1 class="text-3xl m-5">List of Skills</h1>
      <p v-if="loading" class="text-center text-xl m-5">Loading...</p>

      <table class="min-w-full text-center">
        <thead class="bg-white border-b">
          <tr class="">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(skill, index) in skillsData"
            :key="skill.id"
            class="bg-gray-100 border-b"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
              {{ skill.name }}
            </td>
            <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
              {{ skill.description }}
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
            <label>Name</label>
            <input
              v-model="name"
              type="text"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Description</label>
            <input
              v-model="description"
              type="text"
              class="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
            <label>Category Id</label>
            <input
              v-model="category_id"
              type="text"
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
              @click="createSkill"
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
export default {
  name: 'SkillsPage',
  data() {
    return {
      baseUrl: this.$config.axios.browserBaseURL,
      headers: '',
      skillsData: [],
      category_id: '',
      name: '',
      description: '',
      loading: false
    }
  },

  mounted() {
    this.getSkillsData()
  },

  methods: {
    toggleModal() {
      document.getElementById('modal').classList.toggle('hidden')
    },

    // Get list of skills
    getSkillsData() {
      this.loading = true
      const requestUrl = this.baseUrl + 'library/skills'

      // get data from cookies
      const token = 'Basic ' + btoa(this.$cookies.get('AUTHTOKEN') + ':')
      const jessionId = this.$cookies.get('JSESSIONID')

      const myHeaders = new Headers()
      myHeaders.append('Authorization', token)
      myHeaders.append('Cookie', `JSESSIONID=${jessionId}`)

      this.headers = myHeaders

      const requestOptions = {
        method: 'GET',
        headers: this.headers,
        redirect: 'follow',
      }

      fetch(requestUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.laoding = false
          this.skillsData = result
        })
        .catch((error) => console.log('error', error))
    },

    createSkill() {
      const requestUrl = this.baseUrl + 'library/skills'
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

      const payload = {
        category_id: +this.category_id,
        name: this.name,
        description: this.description,
      }

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      fetch(requestUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.getSkillsData()
          this.toggleModal()
          console.log(result)
        })
        .catch((error) => console.log('error', error))
    },
  },
}
</script>
