import { Matrix, EigenvalueDecomposition } from 'ml-matrix'
import _ from 'lodash'

const CONSISTENCY_INDEXES = Object.freeze([
  0,
  0,
  0,
  0.58,
  0.9,
  1.12,
  1.24,
  1.32,
  1.41,
  1.45,
  1.49,
])

export const VALID_VALUES = Object.freeze([
  1 / 2,
  1 / 3,
  1 / 4,
  1 / 5,
  1 / 6,
  1 / 7,
  1 / 8,
  1 / 9,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
])

export default class {
  constructor(size = 0) {
    this.matrix = []

    for (let i = 0; i < size; i++) {
      this.enlarge()
    }
  }

  enlarge() {
    // eslint-disable-next-line prefer-const
    let newRow = [1]

    for (let row = 0; row < this.matrix.length; row++) {
      this.matrix[row].push(1)
      newRow.push(1)
    }

    this.matrix.push(newRow)
  }

  shrink() {
    if (this.matrix.length) {
      for (let row = 0; row < this.matrix.length; row++) {
        this.matrix[row].pop()
      }

      this.matrix.pop()
    }
  }

  reset() {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        this.matrix[row][col] = 1
      }
    }
  }

  setCell(row, col, value) {
    // TODO should not be possible to set an invalid position or an invalid value
    this.matrix[row][col] = value
    this.setReciprocalValue(col, row)
  }

  setReciprocalValue(row, col) {
    this.matrix[row][col] = 1 / this.matrix[col][row]
  }

  weights() {
    const vector = this._principalEigenvector()
    const sum = _.sum(vector)

    return _.map(vector, (e) => e / sum)
  }

  autocomplete(chaos = false) {
    for (let col = 2; col < this.matrix.length; col++) {
      for (let row = 1; row < col; row++) {
        this.setCell(row, col, this._computeCellValue(row, col, chaos))
      }
    }
  }

  autocomplete2(referenceRow = 0) {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = row + 1; col < this.matrix.length; col++) {
        if (row !== referenceRow) {
          this.setCell(
            row,
            col,
            this.matrix[referenceRow][col] / this.matrix[referenceRow][row]
          )
        }
      }
    }
  }

  autocomplete3(referenceRow = 0) {
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = row + 1; col < this.matrix.length; col++) {
        if (row !== referenceRow) {
          this.setCell(
            row,
            col,
            this._closestValue(
              this.matrix[referenceRow][col] / this.matrix[referenceRow][row]
            )
          )
        }
      }
    }
  }

  isConsistent() {
    return this.consistencyRatio() <= 0.1
  }

  consistencyRatio() {
    return this.matrix.length === 2
      ? 0
      : this.consistencyIndex() / this.randomConsistencyIndex()
  }

  consistencyIndex() {
    return (
      (this._principalEigenvalue() - this.matrix.length) /
      (this.matrix.length - 1)
    )
  }

  randomConsistencyIndex() {
    // TODO what if i the matrix is larger than 10 alternatives
    return CONSISTENCY_INDEXES[this.matrix.length]
  }

  _closestValue(value) {
    if (VALID_VALUES.includes(value)) return value

    return VALID_VALUES.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    })
  }

  _computeCellValue(row, col, chaos) {
    // Si el numero se encontraba entre 0 y 1 ver como agregar o quitar un numero decimal, es decir que 1/3 se convierta en 1/2 o en 1/4
    // Si el numero es 1 deberia o dejarlo así o saltar a 2, si el numero es 2 o mayor deberia ver por ejemplo si la division anterior me dió un numero que se acomodo para arriba yo deberia dejarlo igual o tirarlo para abajo, sino jugar con -+1
    //
    // 9/2= 4.5 ~5, 9/3= 3, 9/4=2.25 ~2, 9/5= 1.8 ~2, 9/6= 1.5 ~ 2, 9/7= 1.2 ~1
    //
    //

    let value = this.matrix[0][col] / this.matrix[0][col - row]

    if (value > 1) {
      value = _.round(value)

      if (chaos && value >= 2) {
        value += _.random(-1, 1)
      }
    }

    return value
  }

  _principalEigenvector() {
    const eigenvectors = this._eigenvalueDecomposition().eigenvectorMatrix
    const eigenvalueIdx = this._eigenvalueDecomposition().realEigenvalues.indexOf(
      this._principalEigenvalue()
    )

    return _.times(eigenvectors.rows, (row) =>
      eigenvectors.get(row, eigenvalueIdx)
    )
  }

  _principalEigenvalue() {
    return Math.max(...this._eigenvalueDecomposition().realEigenvalues)
  }

  _eigenvalueDecomposition() {
    return new EigenvalueDecomposition(new Matrix(this.matrix))
  }
}
