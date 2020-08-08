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
              name: 'admin-profile-slug-edit',
              params: { slug: profile.slug() },
            }"
          >
            edit
          </nuxt-link>
          <a @click="deleteProfile(profile.name)">delete</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ProfilesTable',
  props: ['profiles'],
  methods: {
    deleteProfile(profileName) {
      this.$store.commit('removeProfile', profileName)
    },
  },
}
</script>
