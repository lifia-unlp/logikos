class Preset {
  constructor(criterion, values, matrix) {
    this.criterion = criterion
    this.values = values
    this.matrix = matrix
  }

  sortAlternatives(alternatives) {
    const sortedAlternatives = []

    for (const value of this.values) {
      for (const alternative of alternatives) {
        if (alternative[this.criterion.attribute()] === value) {
          sortedAlternatives.push(alternative)
        }
      }
    }

    // maybe return _.orderBy(alternatives, [ (a) => a[this.criterion.attribute()] ])

    return sortedAlternatives
  }

  getSubDecisionMatrix(alternatives) {
    const idxs = alternatives.map((a) =>
      this.values.indexOf(a[this.criterion.attribute()])
    )

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
