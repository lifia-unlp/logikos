import _ from 'lodash'

class Ranking {
  constructor(ranking) {
    this.ranking = ranking
  }

  sort() {
    this.ranking = _.orderBy(this.ranking, ['weight'], ['desc'])
  }

  static combine(rankings) {
    const r = [...rankings[0].ranking]

    for (let i = 1; i < rankings.length; i++) {
      for (let j = 0; j < rankings[i].length; j++) {
        r[j].weight += rankings[i].ranking[j].weight
      }
    }

    return new Ranking(r)
  }
}

export default Ranking
