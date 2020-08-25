<template>
  <div class="container">
    <h1 class="text-4xl">{{ profile.name }}</h1>

    <h2 class="text-xl font-bold mt-4">Criteria</h2>
    <Criteria :criteria="profile.criteria"></Criteria>

    <nuxt-link class="py-1 px-2 rounded bg-gray-400 font-bold" to="/">
      back
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.getters.getProfileById(this.$route.params.id)
    },
  },
}
</script>
