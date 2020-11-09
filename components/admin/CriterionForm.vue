<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div>
        <h2 class="text-secondary text-xl mb-4">New Criterion</h2>
      </div>
      <div>
        <font-awesome-icon
          :icon="['far', 'question-circle']"
          class="text-base text-gray-600 cursor-pointer"
        />
      </div>
    </div>

    <div class="form-field">
      <label class="form-field__label">NAME</label>
      <input v-model="criterion.name" class="form-field__input" type="text" />
    </div>

    <div class="form-field">
      <label class="form-field__label form-field__label--inline">
        SET ATTRIBUTE?
      </label>
      <input v-model="setAttribute" type="checkbox" />
      <p class="form-field__hint">
        &#128712; You should specify an attribute when the name of the criterion
        doesn’t match the corresponding alternative field.
      </p>
    </div>

    <div v-if="setAttribute" class="form-field">
      <label class="form-field__label">ATTRIBUTE</label>
      <input
        v-model="criterion.attribute"
        class="form-field__input"
        type="text"
      />
    </div>

    <p class="mt-4 text-lg text-secondary">Preset</p>

    <div class="form-field">
      <label class="form-field__label">VALUE</label>
      <input v-model="presetValue" class="form-field__input" type="text" />
    </div>

    <button @click="addPresetValue()" class="criterion-form__btn">
      <font-awesome-icon :icon="['fas', 'plus']" />
      Add
    </button>

    <button
      v-if="presetValues.length > 1"
      @click="comparePreset()"
      class="criterion-form__btn"
    >
      <font-awesome-icon :icon="['fas', 'sort-amount-down']" />
      Compare
    </button>

    <ul>
      <li v-for="(preset, i) in presetValues" :key="i">· {{ preset }}</li>
    </ul>

    <button class="btn btn--save" @click="addCriterion">
      Save
    </button>
  </div>
</template>

<script>
import Criterion from '@/models/Criterion'
import _ from 'lodash'

export default {
  name: 'CriterionForm2',
  props: {
    originalCriterion: {
      type: Object,
      default() {
        return new Criterion('')
      },
    },
  },
  data() {
    return {
      criterion: new Criterion(''),
      setAttribute: Boolean(this.originalCriterion.attribute),
      presetValue: '',
      presetValues: [],
    }
  },
  mounted() {
    this.criterion = _.cloneDeep(this.originalCriterion)
  },
  methods: {
    addCriterion() {
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
      this.$emit('comparison:new:preset', this.presetValues, this.criterion)
    },
  },
}
</script>

<style>
.criterion-form__btn {
  @apply text-gray-400 text-sm cursor-pointer;
}

.criterion-form__btn:hover {
  @apply text-accent;
}
</style>
