// import _ from 'lodash'

class Criterion {
  constructor(name) {
    this.name = name
    this.weight = 0
  }

  toString() {
    return this.name
  }
}

export default Criterion
