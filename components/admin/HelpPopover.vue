<template>
  <v-popover offset="16" placement="top">
    <font-awesome-icon
      :icon="['far', 'question-circle']"
      class="text-base text-gray-600 cursor-pointer"
    />

    <template slot="popover">
      <div class="py-4 px-10 bg-white shadow w-1/2">
        <h1 class="popover__title">{{ title }}</h1>
        <div class="mt-1 text-sm">
          <slot></slot>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: 'HelpPopover',
  props: {
    title: String,
  },
}
</script>

<style>
.popover__title {
  @apply text-lg text-primary;
}
</style>
