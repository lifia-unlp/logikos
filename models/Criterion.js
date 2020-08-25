// import _ from 'lodash'

class Criterion {
  constructor(name, subcriteria = []) {
    this.name = name
    this.weight = 0
    this.parent = null
    this.attribute = null
    this.preset = {}
    this.subcriteria = []

    this._addSubcriteria(subcriteria)
  }

  toString() {
    return this.name
  }

  addSubcriterion(criterion) {
    const idx = this.subcriteria.findIndex((c) => c.name === criterion.name)

    if (idx === -1) {
      criterion.parent = this
      this.subcriteria.push(criterion)
    }
  }

  // OPTIMIZE see if this interface makes sense. Change it to removeSubcriterionByName maybe?
  removeSubcriterion(criterionName) {
    const idx = this.subcriteria.findIndex((c) => c.name === criterionName)

    if (idx !== -1) {
      this.subcriteria.splice(idx, 1)
    }
  }

  shouldBeCompared() {
    return this.subcriteria.length > 0
  }

  relativeWeight() {
    return this.weight
  }

  // TODO cambiar esta regla de lintin de mierda
  absoluteWeight() {
    if (this.parent != null) {
      return this.weight * this.parent.weight
    } else {
      return this.weight
    }
  }

  _addSubcriteria(criteria) {
    for (const criterion of criteria) {
      this.addSubcriterion(criterion)
    }
  }

  static deserealize(json) {
    const subcriteria = json.subcriteria.map((c) => Criterion.deserealize(c))

    delete json.subcriteria

    const c = Object.assign(new Criterion(json.name, subcriteria), json)

    return c
  }
}

export default Criterion
