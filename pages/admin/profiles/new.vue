<template>
  <div class="container">
    <h1 class="title">New Profile</h1>

    <label class="block font-bold">Name</label>
    <input v-model="profile.name" class="border rounded" type="text" />

    <label class="block font-bold">Description</label>
    <input v-model="profile.description" class="border rounded" type="text" />

    <h2 class="text-2xl">Criteria</h2>

    <Criteria
      :criteria="profile.criteria"
      @criterion:add="addCriterion"
      @criterion:remove="removeCriterion"
    ></Criteria>

    <div class="mt-8">
      <button
        class="py-1 px-2 rounded bg-green-400 text-white font-bold"
        @click="saveProfile"
      >
        Save
      </button>
      <nuxt-link
        class="py-1 px-2 rounded bg-red-400 text-white font-bold"
        to="/admin/profiles"
      >
        back
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Profile from '@/models/Profile'

export default {
  data() {
    return {
      profile: new Profile(),
    }
  },
  methods: {
    addCriterion(criterion) {
      this.profile.addCriterion(criterion)
    },
    removeCriterion(criterion) {
      this.profile.removeCriterion(criterion.name)
    },
    saveProfile() {
      this.$store.dispatch('addProfile', this.profile)

      this.$router.push({ name: 'admin-profile' })
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
