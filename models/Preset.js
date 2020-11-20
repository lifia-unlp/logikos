import DecisionMatrix from '@/models/DecisionMatrix'

class Preset {
  constructor(values = [], matrix = new DecisionMatrix()) {
    this.values = values
    this.matrix = matrix
  }

  sortAlternatives(alternatives, attribute) {
    const sortedAlternatives = []

    for (const value of this.values) {
      for (const alternative of alternatives) {
        if (alternative[attribute] === value) {
          sortedAlternatives.push(alternative)
        }
      }
    }

    // maybe return _.orderBy(alternatives, [ (a) => a[this.criterion.attribute()] ])

    return sortedAlternatives
  }

  getSubDecisionMatrix(alternatives, attribute) {
    const idxs = alternatives.map((a) => this.values.indexOf(a[attribute]))

    const dm = []

    for (const row of idxs) {
      const line = []
      for (const col of idxs) {
        line.push(this.matrix[row][col])
      }
      dm.push(line)
    }

    return dm
  }

  static deserealize(json) {
    return Object.assign(new Preset(), json)
  }
}

export default Preset
