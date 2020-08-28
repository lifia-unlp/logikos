import DecisionMatrix from './DecisionMatrix'
import Ranking from './Ranking'

export default class {
  constructor(alternatives = [], criterion = null) {
    this.criterion = criterion
    this.alternatives = alternatives
    this.dm = new DecisionMatrix(alternatives.length)
    this.isCompared = false

    if (this.hasPreset()) {
      this.loadPreset()
    }
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

  hasPreset() {
    return Object.prototype.hasOwnProperty.call(this.criterion, 'preset')
  }

  loadPreset() {
    this.alternatives = this.criterion.preset.sortAlternatives(
      this.alternatives
    )

    this.dm.matrix = this.criterion.preset.getSubDecisionMatrix(
      this.alternatives
    )

    this.isCompared = true
  }

  // TODO improve this, maybe add a "absolute weights" boolean argument
  rank() {
    const absoluteWeight =
      this.criterion !== null ? this.criterion.absoluteWeight() : 1

    return new Ranking(
      this.dm.weights().map((weight, idx) => ({
        alternative: this.alternatives[idx],
        weight: weight * absoluteWeight,
      }))
    )
  }
}
