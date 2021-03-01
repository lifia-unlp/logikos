export const state = () => ({
  selectedProfileId: null,
  alternatives: [],
  comparisons: [],
})

export const mutations = {
  setSelectedProfileId(state, profileId) {
    state.selectedProfileId = profileId
  },

  setAlternatives(state, alternatives) {
    state.alternatives = alternatives
  },

  addAlternative(state, alternative) {
    state.alternatives.push(alternative)
  },

  removeAlternative(state, alternativeId) {
    state.alternatives.splice(alternativeId, 1)
  },

  setComparisons(state, comparisons) {
    state.comparisons = comparisons
  },

  updateComparison(state, payload) {
    state.comparisons[payload.id] = payload.comparison
  },

  setCompared(state, comparisonId) {
    state.comparisons[comparisonId].isCompared = true
  },
}

export const getters = {
  getComparisonByCriterion: (state) => (criterion) => {
    return state.comparisons[criterion]
  },
}
