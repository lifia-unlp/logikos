<template>
  <table class="table-auto min-w-full">
    <thead>
      <tr>
        <th class="profile-table-th">NAME</th>
        <th class="profile-table-th">DESCRIPTION</th>
        <th class="profile-table-th">AUTHOR</th>
        <th class="profile-table-th">DATE</th>
        <th class="profile-table-th">CRITERIA</th>
        <th class="profile-table-th"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(profile, key) in profiles" :key="key" class="profile-tr">
        <td class="profile-td profile-name">{{ profile.name }}</td>
        <td class="profile-td">{{ truncatedDescription(profile) }}</td>
        <td class="profile-td">@acimadamore</td>
        <td class="profile-td">1 month ago</td>
        <td class="profile-td">
          <ul class="profile-criteria">
            <li v-for="(criterion, i) in profile.criteria" :key="i">
              {{ criterion.name }} ({{ criterion.absoluteWeight() * 100 }}%)
            </li>
          </ul>
        </td>
        <td class="profile-td">
          <nuxt-link
            :to="{
              name: 'admin-profiles-id-edit',
              params: { id: profile._id },
            }"
          >
            <font-awesome-icon
              :icon="['fas', 'pencil-alt']"
              class="mx-1 text-accent"
            />
          </nuxt-link>
          <a @click="deleteProfile(profile._id)">
            <font-awesome-icon
              :icon="['far', 'trash-alt']"
              class="mx-1 text-accent cursor-pointer"
            />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
  <!--
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
  -->
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
    truncatedDescription(profile) {
      return profile.description.substr(0, 26) + '...'
    },
  },
}
</script>

<style>
.profile-table-th {
  @apply pl-2 text-primary font-bold text-xs text-left;
}

.profile-td {
  @apply pl-2 pr-1 py-2 bg-white border-b-8 border-whitesmoke text-sm;
}

.profile-tr {
  @apply my-8;
}

.profile-name {
  @apply text-lg font-medium text-secondary;
}

.profile-criteria > li {
  @apply inline;
}
/*
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
*/
</style>
