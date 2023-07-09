<template>
  <main class="relative w-full aspect-square flex justify-center items-center">
    <IconNotice
      v-if="!isResult"
      @click.stop
      width="2vh"
      class="absolute top-[2vh] right-[2vh] z-10 cursor-pointer"
      @click="$emit('onModal')"
    ></IconNotice>
    <div
      v-if="isResult"
      class="absolute rounded-full w-[95%] aspect-square bg-[#FDFFE3]"
    ></div>
    <img
      :src="character.title_image"
      class="absolute rounded-full w-[70%] aspect-square object-contain cursor-pointer"
    />
    <Transition
      enter-from-class="opacity-0 "
      enter-active-class="transition-all"
      leave-to-class="opacity-0 "
      leave-active-class="transition-all duration-100"
    >
      <div
        v-if="onSelect"
        class="absolute rounded-full w-[75%] aspect-square bottom-[2vh] bg-black/[0.5] flex justify-center items-center"
      ></div>
    </Transition>
    <Transition
      enter-from-class="opacity-0 w-[0%]"
      enter-active-class="transition-all"
      leave-to-class="opacity-0 "
      leave-active-class="transition-all"
    >
      <IconHeart
        v-if="onSelect"
        class="w-[40%] z-10 scale-100 transition-all duration-200"
      ></IconHeart>
    </Transition>
    <img src="../assets/TagIcon.png" class="absolute w-[92%] bottom-0" />

    <div
      class="absolute font-tmon bottom-0"
      :class="
        isResult
          ? isResultSub
            ? 'text-[1.5vh]'
            : isRank
            ? 'text-[1.2vh]'
            : 'text-[2vh] '
          : 'text-[1.2vh]'
      "
    >
      {{ character.name }}
    </div>
  </main>
</template>

<script>
import IconNotice from "../assets/icon/IconNotice.vue";
import IconHeart from "../assets/icon/IconHeart.vue";

export default {
  props: {
    character: null,
    onSelect: false,
    isResult: false,
    isResultSub: false,
    isRank: false,
  },
  components: {
    IconNotice,
    IconHeart,
  },
};
</script>
