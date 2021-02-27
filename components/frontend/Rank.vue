<template>
  <div class="mx-2 my-4 flex items-center grid grid-cols-12">
    <div class="col-span-1">
      <p class="text-2xl">{{ position }}º</p>
    </div>

    <div class="border-l-2 border-logikos-orange pl-2 col-span-1">
      <img class="w-12" :src="rank.alternative.thumb" />
    </div>

    <div class="col-span-7">
      <p class="text-lg text-logikos">
        <a :href="rank.alternative.url" target="_blank">
          {{ rank.alternative.label }}
        </a>
      </p>
    </div>

    <div class="col-span-3">
      <p>$ {{ rank.alternative.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: {
      type: Object,
    },
    position: {
      type: Number,
    },
  },
}
</script>
