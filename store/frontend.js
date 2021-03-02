export const state = () => ({
  selectedProfileId: null,
  alternatives: [],
  comparisons: [],
  statistics: {},
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

  startExperiment(state) {
    state.statistics.startTime = performance.now()
  },

  endExperiment(state) {
    state.statistics.endTime = performance.now()
  },

  startComparison(state, payload) {
    state.statistics[payload.criterion] = {}
    state.statistics[payload.criterion].startTime = performance.now()
    state.statistics[payload.criterion].widget = payload.widget
    state.statistics[payload.criterion].clicks = 0
  },

  registerClick(state, criterion) {
    state.statistics[criterion].clicks++
  },

  endComparison(state, criterion) {
    state.statistics[criterion].endTime = performance.now()
  },
}

export const getters = {
  getComparisonByCriterion: (state) => (criterion) => {
    return state.comparisons[criterion]
  },
}
