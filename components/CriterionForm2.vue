<template>
  <div>
    <div class="form-field">
      <label class="form-field-label">NAME</label>
      <input v-model="name" class="form-field-input" type="text" />
    </div>

    <div class="form-field">
      <label class="text-sm text-primary tracking-wider">SET ATTRIBUTE?</label>
      <input v-model="setAttribute" type="checkbox" />
      <p class="text-xs text-gray-600">
        &#128712; You should specify an attribute when the name of the criterion
        doesn’t match the corresponding alternative field.
      </p>
    </div>

    <div v-if="setAttribute" class="form-field">
      <label class="form-field-label">ATTRIBUTE</label>
      <input v-model="attribute" class="form-field-input" type="text" />
    </div>

    <p class="mt-4 text-lg text-secondary">Preset</p>

    <div class="form-field">
      <label class="form-field-label">VALUE</label>
      <input v-model="presetValue" class="form-field-input" type="text" />
    </div>

    <button
      @click="addPresetValue()"
      class="text-gray-400 hover:text-accent text-sm cursor-pointer"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />
      Add
    </button>

    <button
      v-if="presetValues.length > 1"
      @click="comparePreset()"
      class="text-gray-400 hover:text-accent text-sm cursor-pointer"
    >
      <font-awesome-icon :icon="['fas', 'sort-amount-down']" />
      Compare
    </button>

    <ul>
      <li v-for="(preset, i) in presetValues" :key="i">· {{ preset }}</li>
    </ul>

    <button
      class="block px-2 py-1 mt-3 bg-primary text-white"
      @click="addCriterion"
    >
      Save
    </button>
  </div>
</template>

<script>
import Criterion from '@/models/Criterion'

export default {
  name: 'CriterionForm2',
  data() {
    return {
      criterion: new Criterion(''),
      name: '',
      setAttribute: false,
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
      if (this.presetValue !== '') {
        this.presetValues.push(this.presetValue)
        this.presetValue = ''
      }
    },
    removePresetValue(idx) {
      this.presetValues.splice(idx, 1)
    },
    comparePreset() {
      this.$emit('comparison:new:preset', this.criterion, this.presetValues)
    },
  },
}
</script>
