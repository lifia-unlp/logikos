<template>
  <h1 class="text-4xl">{{ profile.name }}</h1>
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
