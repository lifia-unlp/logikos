<template>
  <div class="container">
    <h1 class="title">New Profile</h1>

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

.form-field {
  @apply grid grid-cols-6 gap-1 mt-2;
}

.form-field-label {
  @apply col-span-1 px-2 border-l-2 border-logikos-orange;
}

.form-field-input {
  @apply col-span-3 border rounded;
}
</style>
