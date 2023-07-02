<template>
  <main
    class="w-screen h-screen bg-black/60 flex justify-center items-center absolute top-0 z-30"
  >
    <div
      class="w-[78%] aspect-[84/93] bg-[#FFE266] flex items-center flex-col rounded-[5vw]"
    >
      <div
        class="font-tmon h-[18%] w-full px-[6.7%] flex items-center justify-between text-[7vw]"
      >
        <div class="w-[7vw]"></div>
        <div class="flex-1 text-center">꾸버</div>
        <XMarkIcon class="w-[7vw] text-gray-500" @click="$emit('close')" />
      </div>
      <div class="flex w-full justify-center gap-[2.3vw] px-[1%]">
        <LeftArrow width="7.5%"></LeftArrow>
        <div class="flex-1 rounded-[4vw] aspect-square bg-white"></div>
        <RightArrow width="7.5%"></RightArrow>
      </div>
    </div>
  </main>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import RightArrow from "../assets/icon/RightArrow.vue";
import LeftArrow from "../assets/icon/LeftArrow.vue";
export default {
  props: {
    character: { type: Object },
  },
  components: {
    XMarkIcon,
    LeftArrow,
    RightArrow,
  },
};
</script>
