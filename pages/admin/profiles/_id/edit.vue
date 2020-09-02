<template>
  <div class="container">
    <h1 class="title">Edit Profile</h1>

    <div class="form-field">
      <label class="form-field-label">Name</label>
      <input v-model="profile.name" class="form-field-input" type="text" />
    </div>

    <div class="form-field">
      <label class="form-field-label">Description</label>
      <input
        v-model="profile.description"
        class="form-field-input"
        type="text"
      />
    </div>

    <h2 class="text-4xl text-logikos">Criteria</h2>

    <AdminCriteria
      :criteria="profile.criteria"
      @criterion:add="addCriterion"
      @criterion:remove="removeCriterion"
    ></AdminCriteria>

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
import _ from 'lodash'

export default {
  data() {
    return {
      profile: {},
      originalName: '',
    }
  },
  created() {
    this.profile = _.cloneDeep(
      this.$store.getters.getProfileById(this.$route.params.id)
    )

    this.originalName = this.profile.name
  },
  methods: {
    addCriterion(criterion) {
      this.profile.addCriterion(criterion)
    },
    removeCriterion(criterion) {
      this.profile.removeCriterion(criterion.name)
    },
    saveProfile() {
      this.$store.dispatch('updateProfile', this.profile)

      this.$router.push({ name: 'admin-profiles' })
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
</style>
