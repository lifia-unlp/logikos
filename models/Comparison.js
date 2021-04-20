import DecisionMatrix from './DecisionMatrix'
import Ranking from './Ranking'

export default class {
  constructor(alternatives = []) {
    this.alternatives = alternatives
    this.dm = new DecisionMatrix(alternatives.length)
    this.isCompared = false
  }

  addAlternative(alternative) {
    this.alternatives.push(alternative)

    this.dm.enlarge()
  }

  removeAlternative(alternative) {
    const idx = this.alternatives.indexOf(alternative)

    if (idx !== -1) {
      this.alternatives.splice(idx, 1)
      this.dm.shrink()
      this.dm.reset()
    }
  }

  loadPreset(criterion) {
    if (criterion.hasPreset()) {
      this.alternatives = criterion.preset.sortAlternatives(
        this.alternatives,
        criterion.getAttribute()
      )

      this.dm.matrix = criterion.preset.getSubDecisionMatrix(
        this.alternatives,
        criterion.getAttribute()
      )

      this.isCompared = true
    }
  }

  rank(absoluteWeight = 1) {
    return new Ranking(
      this.dm.weights().map((weight, idx) => ({
        alternative: this.alternatives[idx],
        weight: weight * absoluteWeight,
      }))
    )
  }
}
