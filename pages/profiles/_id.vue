<template>
  <div class="container">
    <h1 class="title">"{{ profile.name }}"</h1>

    <h2 class="text-xl font-bold mt-4">Criteria</h2>
    <Criteria :criteria="profile.criteria"></Criteria>

    <nuxt-link class="default-button" to="/">
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

<style>
.title {
  @apply text-5xl text-logikos italic;
}
</style>
