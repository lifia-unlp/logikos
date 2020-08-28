import Preset from '@/models/Preset'
import _ from 'lodash'

class Criterion {
  constructor(name, subcriteria = [], preset = null) {
    this.name = name
    this.weight = 0
    this.parent = null
    this.attribute = null
    this.subcriteria = []

    if (preset) {
      this._setPreset(preset)
    }

    this._addSubcriteria(subcriteria)
  }

  toString() {
    return this.name
  }

  getAttribute() {
    return this.attribute ? this.attribute : this.name.toLowerCase()
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

  getComparables() {
    if (this.subcriteria.length) {
      return _.flattenDeep(this.subcriteria.map((sc) => sc.getComparables()))
    } else {
      return this
    }
  }

  _setPreset(preset) {
    preset.criterion = this
    this.preset = preset
  }

  _addSubcriteria(criteria) {
    for (const criterion of criteria) {
      this.addSubcriterion(criterion)
    }
  }

  static deserealize(json) {
    const subcriteria = json.subcriteria.map((c) => Criterion.deserealize(c))
    let preset = null

    if ('preset' in json && !_.isEmpty(json.preset)) {
      preset = Preset.deserealize(json.preset)
    }

    delete json.subcriteria
    delete json.preset

    return Object.assign(new Criterion(json.name, subcriteria, preset), json)
  }
}

export default Criterion
