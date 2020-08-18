const AHP_DEFINITIONS = {
  1: 'Igual importancia',
  3: 'Moderada importancia',
  5: 'Importancia fuerte',
  7: 'Importancia muy fuerte',
  9: 'Importancia extrema',
}

export default {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#3cba9f',
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
            max: 9,
            min: 0,
            stepSize: 1,
            callback(value, index, values) {
              return value in AHP_DEFINITIONS
                ? `${AHP_DEFINITIONS[value]} - ${value}`
                : value
            },
          },
        },
      ],
    },
  },
}
