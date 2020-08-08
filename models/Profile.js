import _ from 'lodash'

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
    }
  }

  // TODO see if this interface makes sense. Change it to removeSubcriterionByName maybe?
  removeCriterion(criterionName) {
    const idx = this._findCriterionIndex(criterionName)

    if (idx !== -1) {
      this.criteria.splice(idx, 1)
    }
  }

  _findCriterionIndex(criterionName) {
    return this.criteria.findIndex((c) => c.name === criterionName)
  }
}

export default Profile
