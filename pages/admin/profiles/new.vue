<template>
  <div class="container">
    <h1 class="title">New Profile</h1>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8 box">
        <h2 class="text-secondary text-xl">Basic Information</h2>
        <div class="form-field">
          <label class="form-field__label">NAME</label>
          <input v-model="profile.name" class="form-field__input" type="text" />
        </div>

        <div class="form-field">
          <label class="form-field__label">DESCRIPTION</label>
          <textarea
            v-model="profile.description"
            class="form-field__input resize-none"
          >
          </textarea>
        </div>
      </div>

      <div class="col-span-4 row-span-2 box">
        <ProfileSummary :profile="profile"></ProfileSummary>
      </div>

      <div class="col-span-8 box">
        <CriteriaList
          :criteria="profile.criteria"
          :show="!(showCriterionForm || showComparisonForm)"
          @criterion:remove="removeCriterion"
          @criterion:edit="editCriterion"
          @criterion:new="newCriterion"
          @comparison:new="compareCriteria"
        >
        </CriteriaList>
      </div>

      <div v-if="showCriterionForm" class="col-span-8 box">
        <CriterionForm
          :originalCriterion="editingCriterion ? editingCriterion : undefined"
          @criterion:add="addCriterion"
          @comparison:new:preset="comparePreset"
          @cancel="cancelForm('criterion')"
        >
        </CriterionForm>
      </div>

      <div v-if="showComparisonForm" class="col-span-8 box">
        <component
          :is="comparisonWidget"
          :comparison="comparison"
          @comparison:rank="compare"
          @cancel="cancelForm('comparison')"
        >
        </component>
      </div>
    </div>

    <div class="mt-8">
      <button class="btn btn--save" @click="saveProfile">
        Save
      </button>
      <nuxt-link class="btn" to="/admin/profiles">
        Back
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Comparison from '@/models/Comparison'
import Profile from '@/models/Profile'
import Criterion from '@/models/Criterion'

export default {
  components: {
    ComparisonFormA: () => import('@/components/admin/ComparisonFormA'),
    ComparisonFormB: () => import('@/components/admin/ComparisonFormB'),
  },
  beforeMount() {
    if (this.$route.query.criteria) {
      this.$route.query.criteria.map((c) =>
        this.profile.addCriterion(new Criterion(c))
      )
    }
  },
  data() {
    return {
      profile: new Profile(),
      showCriterionForm: false,
      showComparisonForm: false,
      parentCriterion: null,
      editingCriterion: null,
      criterion: null,
      comparison: null,
    }
  },
  computed: {
    comparisonWidget() {
      return 'ComparisonForm' + (this.$route.query.widget || 'B').toUpperCase()
    },
  },
  methods: {
    cancelForm(form) {
      switch (form) {
        case 'criterion':
          this.parentCriterion = this.criterion = null
          this.showCriterionForm = false
          if (this.showComparisonForm) {
            this.showComparisonForm = false
            this.comparison = null
          }
          break
        case 'comparison':
          this.comparison = null
          this.showComparisonForm = false
          break
      }
    },
    newCriterion(parentCriterion = null) {
      this.showCriterionForm = true

      if (parentCriterion !== null) {
        this.parentCriterion = parentCriterion
      }
    },
    editCriterion(criterion) {
      this.editingCriterion = criterion
      this.showCriterionForm = true
    },
    addCriterion(criterion) {
      if (this.editingCriterion !== null) {
        Object.assign(this.editingCriterion, criterion)
      } else if (this.parentCriterion !== null) {
        this.parentCriterion.addSubcriterion(criterion)
      } else {
        this.profile.addCriterion(criterion)
      }

      this.editingCriterion = null
      this.parentCriterion = null
      this.showCriterionForm = false
    },
    removeCriterion(criterion) {
      this.profile.removeCriterion(criterion.name)
    },
    compareCriteria(criteria) {
      this.showComparisonForm = true
      this.comparison = new Comparison(criteria)
    },
    comparePreset(...args) {
      const [presetValues, criterion] = args
      this.criterion = criterion
      this.comparison = new Comparison(presetValues)
      this.showComparisonForm = true
    },
    compare(comparison) {
      if (this.criterion !== null) {
        this.criterion.preset = {
          values: comparison.alternatives,
          dm: comparison.dm,
        }
      } else {
        const ranking = comparison.rank().ranking

        for (const rankedItem of ranking) {
          for (const criterion of comparison.alternatives) {
            if (rankedItem.alternative === criterion) {
              criterion.weight = rankedItem.weight
            }
          }
        }
      }

      this.comparison = null
      this.criterion = null
      this.showComparisonForm = false
    },
    saveProfile() {
      this.$store.dispatch('addProfile', this.profile)

      this.$router.push({ name: 'admin-profiles' })
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.box {
  @apply mb-8 px-5 py-4 bg-white shadow-lg;
}

.btn {
  @apply py-1 px-2 bg-secondary text-white font-bold;
}

.btn--save {
  @apply bg-primary;
}

.form-field {
  @apply mt-3;
}

.form-field__label {
  @apply block text-sm text-primary tracking-wider;
}

.form-field__label--inline {
  @apply inline;
}

.form-field__input {
  @apply py-1 px-2 w-full border border-gray-300 bg-white text-sm;
}

.form-field__hint {
  @apply text-xs text-gray-600;
}
</style>
