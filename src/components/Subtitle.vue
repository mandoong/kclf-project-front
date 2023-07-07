<template>
  <div
    class="w-full text-xl sticky top-0 font-bold h-16 flex justify-between items-center bg-gray-100"
  >
    <slot></slot>
    <button v-if="isBack">
      <XMarkIcon class="w-10" @click="$router.back()"></XMarkIcon>
    </button>
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
