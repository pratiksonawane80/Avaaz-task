<template>
  <div>
    <div class="text-center">
      <nuxt-link to="/users">
      <button
        type="button"
        class="
          m-5
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
      >
        Users
      </button>
      </nuxt-link>

  <nuxt-link to ="/skills">
      <button
        type="button"
        class="
          m-5
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
      >
        Skills
      </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedirectPage',
  methods: {

  }
}
</script>
