<template>
  <div class="flex w-1/3 m-2 p-2 border-2 rounded border-blue-400">
    <img class="w-12" :src="phone.image" />
    <p class="self-center">
      <a :href="phone.url" target="_blank">{{ phone.model }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Phone',
  props: {
    phone: {
      type: Object,
    },
  },
}
</script>
