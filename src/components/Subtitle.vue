<template>
  <div class="w-full text-2xl font-bold mb-10 h-12 flex justify-between">
    <slot></slot>
    <div v-if="isBack">
      <XMarkIcon class="w-10" @click="$router.back()"></XMarkIcon>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";
export default {
  props: {
    isBack: false,
  },
  components: { XMarkIcon },
};
</script>
