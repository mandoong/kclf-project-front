<template>
  <div
    v-show="onModal"
    class="absolute top-0 left-0 w-screen h-screen bg-black/[0.5] flex justify-center items-center"
  >
    <Transition
      enter-from-class="opacity-0 translate-y-5"
      enter-active-class="transition-all"
      leave-to-class="opacity-0 translate-y-5"
      leave-active-class="transition-all"
    >
      <div
        v-show="onModal"
        class="w-96 bg-white rounded-lg flex items-center justify-center flex-col p-4"
      >
        <div class="flex-1">
          <slot></slot>
        </div>

        <div v-if="onButton" class="w-full flex-1">
          <div class="w-full h-12 flex justify-center gap-10 text-white">
            <button
              class="w-20 flex justify-center items-center rounded-lg bg-blue-500"
              @click="$emit('submit')"
            >
              예
            </button>
            <button
              class="w-20 flex justify-center items-center rounded-lg bg-red-500"
              @click="$emit('close')"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    onModal: false,
    onButton: false,
  },
};
</script>
