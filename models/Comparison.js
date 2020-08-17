import DecisionMatrix from './DecisionMatrix'
import Ranking from './Ranking'

export default class {
  constructor (criterion, alternatives = []) {
    this.criterion = criterion
    this.alternatives = alternatives
    this.dm = new DecisionMatrix(alternatives.length)
  }

  addAlternative (alternative) {
    this.alternatives.push(alternative)

    this.dm.enlarge()
  }

  removeAlternative (alternative) {
    const idx = this.alternatives.indexOf(alternative)

    if (idx !== -1) {
      this.alternatives.splice(idx, 1)
      this.dm.shrink()
      this.dm.reset()
    }
  }

  loadPreset () {
    this.alternatives = this.criterion.preset.sortAlternatives(this.alternatives)

    this.dm.matrix = this.criterion.preset.getSubDecisionMatrix(this.alternatives)
  }

  // TODO improve this, maybe add a "absolute weights" boolean argument
  rank () {
    return new Ranking(this.dm.weights().map((weight, idx) => ({ alternative: this.alternatives[idx], weight: weight * this.criterion.absoluteWeight() })))
  }
}
