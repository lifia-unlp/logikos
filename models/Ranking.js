import _ from 'lodash'

class Ranking {
  constructor(ranking) {
    this.ranking = ranking
  }

  sort() {
    this.ranking = _.orderBy(this.ranking, ['weight'], ['desc'])
  }

  static combine(rankings) {
    const r = []

    for (let i = 0; i < rankings.length; i++) {
      for (let j = 0; j < rankings[i].length; j++) {
        if (j + 1 > r.length) {
          r.push({ alternative: rankings[i][j].alternative, weight: 0 })
        }

        r[j].weight += rankings[i][j].weight
      }
    }

    return new Ranking(r)
  }
}

export default Ranking
