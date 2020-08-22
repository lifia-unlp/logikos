<template>
  <div>
    <label for="name">Name:</label>
    <input v-model="name" name="name" type="text" />

    <label for="setAttribute">Set attribute?</label>
    <input v-model="setAttribute" type="checkbox" name="setAttribute" />

    <template v-if="setAttribute">
      <label for="attribute">Attribute:</label>
      <input v-model="attribute" name="attribute" type="text" />
    </template>

    <p>Preset:</p>
    <label for="presetValue">Value:</label>
    <input v-model="presetValue" name="presetValue" type="text" />
    <button @click="addPresetValue">Add Value</button>
    <button @click="comparePreset">compare</button>

    <ul>
      <li v-for="(value, key) in presetValues" :key="key">
        {{ value }}
      </li>
    </ul>

    <ComparisonC
      v-if="comparing"
      :comparison="comparison"
      @comparison:rank="weightCriteria"
    >
    </ComparisonC>

    <button @click="addCriterion">save criterion</button>
  </div>
</template>

<script>
import Criterion from '@/models/Criterion'
import Comparison from '@/models/Comparison'

export default {
  name: 'CriterionForm',
  data() {
    return {
      setAttribute: false,
      comparing: false,
      comparison: {},
      criterion: new Criterion(''),
      name: '',
      attribute: '',
      presetValue: '',
      presetValues: [],
    }
  },
  methods: {
    addCriterion() {
      this.criterion.name = this.name
      this.criterion.attribute = this.attribute

      this.$emit('criterion:add', this.criterion)
    },
    addPresetValue() {
      this.presetValues.push(this.presetValue)
      this.presetValue = ''
    },
    comparePreset() {
      this.comparing = !this.comparing
      this.comparison = new Comparison(this.presetValues)
    },
    weightCriteria() {
      this.criterion.preset = { values: this.presetValues }
      this.comparing = false
      console.log('TO DO')
    },
  },
}
</script>
