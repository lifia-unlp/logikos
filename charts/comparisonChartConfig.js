// +--------------+------+
// | chart | AHP  |  -1  |
// +--------------+------+
// |   8   |  9   |  1/9 |
// |   7   |  8   |  1/8 |
// |   6   |  7   |  1/7 |
// |   5   |  6   |  1/6 |
// |   4   |  5   |  1/5 |
// |   3   |  4   |  1/4 |
// |   2   |  3   |  1/3 |
// |   1   |  2   |  1/2 |
// |   0   |  1   |   1  |
// |  -1   |  1/2 |   2  |
// |  -2   |  1/3 |   3  |
// |  -3   |  1/4 |   4  |
// |  -4   |  1/5 |   5  |
// |  -5   |  1/6 |   6  |
// |  -6   |  1/7 |   7  |
// |  -7   |  1/8 |   8  |
// |  -8   |  1/9 |   9  |
// +-------+------+------+
//
// Also values between matrix & chart should be reversed.
//   Ej. Storage 8GB vs 32GB chart: 4 matrix: 1/4

const AHP_DEFINITIONS = {
  '-8': 'Extremadamente peor',
  '-6': 'Muy fuertemente peor',
  '-4': 'Fuertemente peor',
  '-2': 'Moderadamente peor',
  '0': 'Igual importancia',
  '2': 'Moderada importancia',
  '4': 'Importancia fuerte',
  '6': 'Importancia muy fuerte',
  '8': 'Importancia extrema',
}

// Use conversion table on top
export function convertAHPToChart(value) {
  return value >= 1 ? (value - 1) * -1 : 1 / value - 1
}

export function convertChartToAHP(value) {
  return value > 0 ? 1 / (value + 1) : (value - 1) * -1
}

export default {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#71BBE8',
        fill: false,
      },
    ],
  },
  options: {
    dragData: true,
    dragOptions: {
      magnet: {
        to: Math.round,
      },
    },
    onDragStart(e, element) {
      if (element._index === 0) return false
    },
    // onDragEnd: function (e, datasetIndex, index, value) {
    //   dragEndHandler(index, value)
    // },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            max: 8,
            min: -8,
            stepSize: 1,
            callback(value, index, values) {
              return value in AHP_DEFINITIONS ? AHP_DEFINITIONS[value] : '-'
            },
          },
        },
      ],
    },
  },
}
