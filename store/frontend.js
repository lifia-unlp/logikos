export const state = () => ({
  selectedProfileId: null,
  alternatives: [],
  comparisons: [],
})

export const getters = {
  getComparisonByCriterion: (state) => (criterion) => {
    return state.comparisons.find((c) => c.criterion.name === criterion.name)
  },
}

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

  setCompared(state, comparisonId) {
    state.comparisons[comparisonId].isCompared = true
  },

  addComparison(state, comparison) {
    state.comparisons.push(comparison)
  },

  removeComparison(state, comparisonId) {
    state.comparisons.splice(comparisonId, 1)
  },
}
