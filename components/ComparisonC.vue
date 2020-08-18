<template>
  <div class="border-solid border-2">
    <p>comparison</p>
    <table>
      <tr v-for="(row, i) in comparison.dm.matrix" :key="i">
        <td v-for="(cell, j) in row" :key="j">
          <input v-model="comparison.dm.matrix[i][j]" @change="invert(i, j)" />
        </td>
      </tr>
    </table>

    <p>CR: {{ comparison.dm.consistencyRatio() }}</p>

    <button @click="save">Save comparison</button>
  </div>
</template>

<script>
export default {
  name: 'ComparisonC',
  props: ['comparison'],
  methods: {
    invert(row, col) {
      this.comparison.dm.setReciprocalValue(col, row)

      this.$set(this.comparison.dm.matrix, col, this.comparison.dm.matrix[col])
    },

    save() {
      this.$emit('comparison:rank', this.comparison.rank())
    },
  },
}
</script>
