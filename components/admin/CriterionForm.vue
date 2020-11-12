<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div>
        <h2 class="text-secondary text-xl mb-4">New Criterion</h2>
      </div>
      <div>
        <HelpPopover title="Criterion">
          Create a new criterion or edit an existing one. If the name does not
          match the alternative's corresponding property you should specify it
          on the "attribute" field, for instance if the criterion's name is
          "cost" you should specify "price" in the attribute field. <br />
          If the criterion doesn't have subcriteria you can specify a preset, a
          set of possible values and precompare them so the profile user doesn't
          have to!
        </HelpPopover>
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

    <div v-if="criterion.canHavePreset()">
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
        v-if="criterion.preset.values.length > 1"
        @click="comparePreset()"
        class="criterion-form__btn"
      >
        <font-awesome-icon :icon="['fas', 'sort-amount-down']" />
        Compare
      </button>

      <ul>
        <li v-for="(preset, i) in criterion.preset.values" :key="i">
          · {{ preset }}
        </li>
      </ul>
    </div>

    <button class="btn btn--save" @click="addCriterion">
      Save
    </button>
    <button class="btn" @click="cancel">
      Cancel
    </button>
  </div>
</template>

<script>
import Criterion from '@/models/Criterion'
import _ from 'lodash'

export default {
  name: 'CriterionForm',
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
    }
  },
  mounted() {
    this.criterion = _.cloneDeep(this.originalCriterion)
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    addCriterion() {
      this.$emit('criterion:add', this.criterion)
    },
    addPresetValue() {
      if (this.presetValue !== '') {
        this.criterion.preset.values.push(this.presetValue)
        this.presetValue = ''
      }
    },
    removePresetValue(idx) {
      this.criterion.preset.values.splice(idx, 1)
    },
    comparePreset() {
      this.$emit(
        'comparison:new:preset',
        this.criterion.preset.values,
        this.criterion
      )
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
