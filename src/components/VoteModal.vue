<template>
  <main
    class="w-screen h-screen bg-black/60 flex justify-center items-center absolute top-0 z-30"
  >
    <div
      class="w-[78%] aspect-[84/51] bg-[#FFE266] flex items-center flex-col rounded-[5vw]"
    >
      <div
        v-if="!isVoteActive"
        class="font-tmon text-center py-[4vh] w-full h-full flex items-center flex-col text-[4.5vw] gap-[20%]"
      >
        <Transition
          appear
          enter-from-class="opacity-0 translate-y-10"
          enter-active-class="transition-all duration-500"
        >
          <div>
            {{ count }}개의 캐릭터를 선택하셨습니다.<br />
            이대로 투표하시겠습니까?
          </div>
        </Transition>
        <Transition
          appear
          enter-from-class="opacity-0 translate-y-10"
          enter-active-class="transition-all duration-500"
        >
          <div class="flex text-[6vw] w-full justify-center gap-[10%] delay-75">
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[4vw]"
              @click="$emit('voteCharacter'), (isVoteActive = true)"
            >
              예
            </div>
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[4vw]"
              @click="$emit('close')"
            >
              아니오
            </div>
          </div>
        </Transition>
      </div>

      <Transition
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div
          v-if="isVoteActive"
          class="font-tmon text-center py-[4vh] w-full h-full flex items-center ju flex-col text-[4.5vw] gap-[20%]"
        >
          <div>
            투표가 완료되었습니다.<br />
            감사합니다.
          </div>
          <div
            class="flex text-[6vw] items-center justify-center w-[40%] aspect-[23/14] bg-white rounded-[4vw]"
            @click="$router.push('/')"
          >
            처음으로
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import RightArrow from "../assets/icon/RightArrow.vue";
import LeftArrow from "../assets/icon/LeftArrow.vue";
export default {
  props: {
    count: { type: Number },
  },
  data() {
    return {
      imagesPage: 0,
      isImage: null,
      isVoteActive: false,
    };
  },

  methods: {
    upPage() {
      if (this.imagesPage < this.character.images.length - 1) {
        this.imagesPage = this.imagesPage + 1;
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
