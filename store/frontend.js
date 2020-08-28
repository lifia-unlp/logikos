export const state = () => ({
  selectedProfileId: null,
  comparisons: [],
})

export const mutations = {
  setSelectedProfileId(state, profileId) {
    state.selectedProfileId = profileId
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
