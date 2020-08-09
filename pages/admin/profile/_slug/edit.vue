<template>
  <div class="container">
    <h1 class="title">Edit Profile</h1>

    <label for="name">Name:</label>
    <input v-model="profile.name" name="name" type="text" />

    <label for="description">Description:</label>
    <input v-model="profile.description" name="description" type="text" />

    <h2 class="subtitle">Criteria</h2>

    <Criteria
      :criteria="profile.criteria"
      @add:criterion="addCriterion"
    ></Criteria>

    <button @click="saveProfile">Save</button>

    <nuxt-link to="/admin/profile">Back</nuxt-link>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  created() {
    const p = _.cloneDeep(
      this.$store.getters.getProfileByName(_.lowerCase(this.$route.params.slug))
    )

    this.profile = p
    this.originalName = p.name
  },
  methods: {
    addCriterion(criterion) {
      this.profile.addCriterion(criterion)
    },
    saveProfile() {
      this.$store.commit('updateProfile', {
        originalName: this.originalName,
        profile: this.profile,
      })

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
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
