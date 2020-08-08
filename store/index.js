export const state = () => ({
  profiles: [],
})

export const getters = {
  getProfileByName: (state) => (name) => {
    return state.profiles.find((p) => p.name === name)
  },
}

export const mutations = {
  addProfile(state, profile) {
    state.profiles.push(profile)
  },

  removeProfile(state, profileName) {
    const idx = state.profiles.findIndex((p) => p.name === profileName)

    state.profiles.splice(idx, 1)
  },
}
