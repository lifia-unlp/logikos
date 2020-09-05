<template>
  <div class="mt-2 p-4 order-solid border-2 border-gray-200">
    <div class="form-field">
      <label class="form-field-label">Name</label>
      <input v-model="name" class="form-field-input" type="text" />
    </div>

    <label>Set attribute?</label>
    <input v-model="setAttribute" type="checkbox" />

    <template v-if="setAttribute">
      <label class="block font-bold">Attribute</label>
      <input v-model="attribute" class="border rounded" type="text" />
    </template>

    <h3 class="text-xl m-2 text-logikos">Preset</h3>

    <div class="pl-4">
      <div class="form-field">
        <label class="form-field-label">Value</label>
        <input v-model="presetValue" class="form-field-input" type="text" />

        <div class="col-span-1">
          <button class="button-default" @click="addPresetValue">
            Add value
          </button>

          <button class="button-default" @click="comparePreset">
            Compare
          </button>
        </div>
      </div>

      <ul>
        <li v-for="(value, key) in presetValues" :key="key" class="inline">
          {{ value }}
        </li>
      </ul>

      <ComparisonForm
        v-if="comparing"
        :comparison="comparison"
        @comparison:rank="weightCriteria"
      >
      </ComparisonForm>
    </div>

    <button class="button-default mt-2" @click="addCriterion">
      Save criterion
    </button>
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
    weightCriteria(comparison) {
      this.criterion.preset = { values: this.presetValues, dm: comparison.dm }
      this.comparing = false
    },
  },
}
</script>
