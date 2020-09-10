<template>
  <div>
    <div v-for="(profile, key) in profiles" :key="key" class="profile-box">
      <div class="w-4/6">
        <p class="profile-name">{{ profile.name }}</p>
        <p class="profile-description">{{ profile.description }}</p>
        <ul>
          <li
            v-for="(criterion, i) in profile.criteria"
            :key="i"
            class="criterion-pill"
          >
            {{ criterion.name }} - {{ criterion.absoluteWeight() * 100 }}%
          </li>
        </ul>
      </div>

      <div class="w-2/6">
        <nuxt-link
          :to="{
            name: 'admin-profiles-id-edit',
            params: { id: profile._id },
          }"
        >
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
            class="mx-1 text-logikos-dark"
          />
        </nuxt-link>
        <a @click="deleteProfile(profile._id)">
          <font-awesome-icon
            :icon="['far', 'trash-alt']"
            class="mx-1 text-logikos-dark cursor-pointer"
          />
        </a>
      </div>
    </div>
  </div>
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

<style>
.profile-box {
  @apply pl-3 border-l-2 border-logikos-orange flex content-between items-center;
}

.profile-name {
  @apply text-2xl text-logikos-light font-light;
}

.profile-description {
  @apply text-logikos-dark;
}

.criterion-pill {
  @apply inline px-2 py-1 mr-2 rounded bg-logikos-orange text-xs text-white font-bold;
}
</style>
