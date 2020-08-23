<template>
  <div class="mt-2 p-4 order-solid border-2 border-indigo-300">
    <div>
      <label class="block font-bold">Name</label>
      <input v-model="name" class="border rounded" type="text" />
    </div>

    <label>Set attribute?</label>
    <input v-model="setAttribute" type="checkbox" />

    <template v-if="setAttribute">
      <label class="block font-bold">Attribute</label>
      <input v-model="attribute" class="border rounded" type="text" />
    </template>

    <h3 class="text-xl m-2 text-indigo-800">Preset</h3>

    <div class="pl-4">
      <label class="block font-bold">Value</label>
      <input v-model="presetValue" class="border rounded" type="text" />
      <button
        class="py-1 px-2 border-2 rounded border-indigo-300 text-sm"
        @click="addPresetValue"
      >
        Add value
      </button>
      <button
        class="py-1 px-2 border-2 rounded border-indigo-300 text-sm"
        @click="comparePreset"
      >
        Compare
      </button>

      <ul>
        <li v-for="(value, key) in presetValues" :key="key" class="inline">
          {{ value }}
        </li>
      </ul>

      <ComparisonC
        v-if="comparing"
        :comparison="comparison"
        @comparison:rank="weightCriteria"
      >
      </ComparisonC>
    </div>

    <button
      class="py-1 px-2 border-2 rounded border-indigo-300 text-xs"
      @click="addCriterion"
    >
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
