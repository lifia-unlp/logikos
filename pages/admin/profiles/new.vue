<template>
  <div class="container">
    <h1 class="title">New Profile</h1>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8 box">
        <h2 class="text-secondary text-xl">Basic Information</h2>
        <div class="form-field">
          <label class="form-field-label">NAME</label>
          <input v-model="profile.name" class="form-field-input" type="text" />
        </div>

        <div class="form-field">
          <label class="form-field-label">DESCRIPTION</label>
          <textarea
            v-model="profile.description"
            class="form-field-input resize-none"
          >
          </textarea>
        </div>
      </div>

      <div class="col-span-8 box">
        <h2 class="text-secondary text-xl">Criteria</h2>

        <AdminCriteria
          :criteria="profile.criteria"
          @criterion:add="addCriterion"
          @criterion:remove="removeCriterion"
        ></AdminCriteria>
      </div>
    </div>

    <div class="mt-8">
      <button
        class="py-1 px-2 bg-primary text-white font-bold"
        @click="saveProfile"
      >
        Save
      </button>
      <nuxt-link
        class="py-1 px-2 bg-secondary text-white font-bold"
        to="/admin/profiles"
      >
        Back
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

.box {
  @apply mb-8 px-5 py-4 bg-white shadow-lg;
}

.form-field {
  @apply mt-3;
}

.form-field-label {
  @apply block text-sm text-primary tracking-wider;
}

.form-field-input {
  @apply py-1 px-2 w-full border border-gray-300 bg-white text-sm;
}
</style>
