import _ from 'lodash'

class Profile {
  constructor(name, description) {
    this.name = name
    this.description = description
  }

  toString() {
    return this.name
  }

  slug() {
    return _.kebabCase(this.name)
  }
}

export default Profile
