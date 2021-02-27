<template>
  <div>
    <Alternative
      v-for="(alternative, key) in alternatives"
      :key="key"
      :alternative="alternative"
    >
    </Alternative>

    <div class="mt-4 flex justify-end">
      <nuxt-link to="/selectProfile" v-if="alternatives.length > 1" class="btn">
        Next
      </nuxt-link>
      <a v-else class="btn btn--disabled">
        Next
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'frontend',
  data() {
    return {
      alternativeUrl: '',
    }
  },
  beforeCreate() {
    const alternatives = [
      {
        label: 'Bariloche',
        price: 70000,
        description:
          'Bariloche es un destino turístico para los amantes de la naturaleza y la aventura. Se puede realizar el paseo a Circuito Chico bordeando los Lagos Nahuel Huapi y Moreno, y desde allí subir al cerro Campanario en aerosilla para tener vistas de los alrededores. Puede ascender el cerro catedral o si es un escalador experimentado puede enfrentarse al desafío del cerro Tronador. A pocos kilómetros de la ciudad puede hacer trekking en el parque nacional Nahuel Huapi o realizar el camino de los 7 lagos, donde encontrará postales únicas de la Patagonia.',
      },
      {
        label: 'Mendoza',
        price: 60000,
        description:
          'La tierra del Malbec. Deguste vino en distintas bodegas con un paisaje andino alucinante. Puede realizar trekking a los pies del Aconcagua, la cima más alta de las américas o en el cañón del Atuel, donde se ven formaciones rocosas de una gran belleza. Si le gusta esquiar puede ir a Las Leñas donde se encuentra uno de los centros de ski más importante de América Latina. Conozca las pequeñas localidades escondidas en la provincia y sus atractivos únicos como el dique Potrerillos o las termas de Cacheuta.',
      },
    ]

    this.$store.commit('frontend/setAlternatives', [])

    for (const alternative of alternatives) {
      this.$store.commit('frontend/addAlternative', alternative)
    }
  },
  computed: {
    ...mapState('frontend', ['alternatives']),
  },
}
</script>

<style>
.btn {
  @apply py-1 px-2 bg-secondary text-white font-bold;
}

.btn--disabled {
  @apply bg-gray-200 text-gray-400;
}
</style>
