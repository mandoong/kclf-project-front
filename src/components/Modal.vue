<template>
  <main
    v-if="character"
    class="w-screen h-screen bg-black/60 flex justify-center items-center absolute top-0 z-30"
  >
    <div
      class="w-[78%] aspect-[84/93] bg-[#FFE266] flex items-center flex-col rounded-[5vw]"
    >
      <div
        class="font-tmon h-[18%] w-full px-[6.7%] flex items-center justify-between text-[7vw]"
      >
        <div class="w-[7vw]"></div>
        <div class="flex-1 text-center">{{ character.name }}</div>
        <XMarkIcon class="w-[7vw] text-gray-500" @click="$emit('close')" />
      </div>
      <div class="flex w-full justify-center gap-[2.3vw] px-[1%]">
        <LeftArrow @click="downPage" width="7.5%"></LeftArrow>
        <div
          class="flex-1 rounded-[4vw] aspect-square bg-white overflow-hidden flex justify-center items-center"
        >
          <img
            class="w-[80%] object-center"
            :src="isImage || character.images[0].image"
          />
        </div>
        <RightArrow @click="upPage" width="7.5%"></RightArrow>
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
  data() {
    return {
      imagesPage: 0,
      isImage: null,
    };
  },

  methods: {
    upPage() {
      if (this.imagesPage < this.character.images.length - 1) {
        this.imagesPage = this.imagesPage + 1;
        this.isImage = this.character.images[this.imagesPage].image;
      }
    },

    downPage() {
      if (this.imagesPage > 0) {
        this.imagesPage = this.imagesPage - 1;
        this.isImage = this.character.images[this.imagesPage].image;
      }
    },
  },
  components: {
    XMarkIcon,
    LeftArrow,
    RightArrow,
  },
};
</script>
