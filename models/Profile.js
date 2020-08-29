import _ from 'lodash'
import Criterion from '@/models/Criterion'

class Profile {
  constructor(name, description, criteria = []) {
    this.name = name
    this.description = description
    this.criteria = criteria
  }

  toString() {
    return this.name
  }

  slug() {
    return _.kebabCase(this.name)
  }

  addCriterion(criterion) {
    if (this._findCriterionIndex(criterion.name)) {
      this.criteria.push(criterion)
      this._distribuiteWeights()
    }
  }

  // TODO see if this interface makes sense. Change it to removeSubcriterionByName maybe?
  removeCriterion(criterionName) {
    const idx = this._findCriterionIndex(criterionName)

    if (idx !== -1) {
      this.criteria.splice(idx, 1)
      this._distribuiteWeights()
    }
  }

  getComparableCriteria() {
    return _.flattenDeep(this.criteria.map((c) => c.getComparables()))
  }

  _distribuiteWeights() {
    for (const criterion of this.criteria) {
      criterion.weight = 1 / this.criteria.length
    }
  }

  _findCriterionIndex(criterionName) {
    return this.criteria.findIndex((c) => c.name === criterionName)
  }

  static deserealize(json) {
    json.criteria = json.criteria.map((c) => Criterion.deserealize(c))

    return Object.assign(new Profile(), json)
  }
}

export default Profile
