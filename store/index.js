import Profile from '@/models/Profile'
import Axios from 'axios'

const BASE_URL = 'http://localhost:9000'

export const state = () => ({
  profiles: [],
})

export const getters = {
  getProfileById: (state) => (id) => {
    return state.profiles.find((p) => p._id === id)
  },
}

export const mutations = {
  setProfiles(state, profiles) {
    state.profiles = profiles
  },

  addProfile(state, profile) {
    state.profiles.push(profile)
  },

  updateProfile(state, profile) {
    const idx = state.profiles.findIndex((p) => p._id === profile._id)

    state.profiles[idx] = profile
  },

  removeProfile(state, profileId) {
    const idx = state.profiles.findIndex((p) => p._id === profileId)

    state.profiles.splice(idx, 1)
  },
}

export const actions = {
  async fetchProfiles(context, payload) {
    const { data } = await Axios.get(`${BASE_URL}/profiles`)
    context.commit(
      'setProfiles',
      data.map((d) => Profile.deserealize(d))
    )
  },

  async addProfile(context, payload) {
    const { data } = await Axios({
      method: 'post',
      url: `${BASE_URL}/profiles`,
      data: payload,
      transformRequest: [
        function (data, headers) {
          headers['Content-Type'] = 'application/json'
          return JSON.stringify(data, (k, v) =>
            k === 'parent' || k === 'criterion' ? undefined : v
          )
        },
      ],
    })

    context.commit('addProfile', Profile.deserealize(data))
  },

  async updateProfile(context, profile) {
    await Axios({
      method: 'put',
      url: `${BASE_URL}/profiles/${profile._id}`,
      data: profile,
      transformRequest: [
        function (data, headers) {
          headers['Content-Type'] = 'application/json'
          return JSON.stringify(data, (k, v) =>
            k === 'parent' || k === 'criterion' ? undefined : v
          )
        },
      ],
    })

    context.commit('updateProfile', profile)
  },

  async removeProfile(context, profileId) {
    await Axios.delete(`${BASE_URL}/profiles/${profileId}`)

    context.commit('removeProfile', profileId)
  },
}
