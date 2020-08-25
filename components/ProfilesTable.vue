<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th colspan="3">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(profile, key) in profiles" :key="key">
        <td>{{ profile.name }}</td>
        <td>{{ profile.description }}</td>
        <td>
          <nuxt-link
            :to="{
              name: 'admin-profiles-id-edit',
              params: { id: profile._id },
            }"
          >
            edit
          </nuxt-link>
          <a @click="deleteProfile(profile._id)">delete</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ProfilesTable',
  props: {
    profiles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    deleteProfile(profileId) {
      this.$store.dispatch('removeProfile', profileId)
    },
  },
}
</script>
