<template>
  <main
    class="w-full h-screen bg-black/60 flex justify-center items-center absolute top-0 z-30"
  >
    <div
      class="w-[45vh] bg-[#FFE266] flex items-center flex-col rounded-[3vh]"
      :class="!isSms ? 'aspect-[84/81]' : 'aspect-[84/51]'"
    >
      <div
        v-if="!isVoteActive && isSms"
        class="font-tmon text-center py-[4vh] w-full h-full flex items-center flex-col text-[2.8vh] gap-[20%]"
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
          <div class="flex text-[3vh] w-full justify-center gap-[10%] delay-75">
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[2vh]"
              @click="$emit('voteCharacter'), (isVoteActive = true)"
            >
              예
            </div>
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[2vh]"
              @click="$emit('close')"
            >
              아니오
            </div>
          </div>
        </Transition>
      </div>

      <div class="h-full w-full" v-if="!isSms">
        <div
          class="flex flex-col items-center justify-between h-full w-full px-[5vh] py-[3vh] font-tmon"
        >
          <div class="text-[2.8vh]">투표 인증</div>
          <div class="text-[2vh]">
            <div>중복 투표를 방지하기 위해</div>
            <div>인증 후 투표가 진행됩니다.</div>
          </div>
          <div class="flex flex-col gap-[1vh] w-full font-neo font-bold">
            <input
              class="px-2 h-[4.2vh] px-[1.5vh] w-full text-[2vh] border border-[#707070]"
              placeholder="이름"
              v-model="name"
            />
            <input
              class="px-2 h-[4.2vh] px-[1.5vh] w-full text-[2vh] border border-[#707070]"
              placeholder="전화번호"
              v-model="phoneNum"
            />
          </div>

          <div class="flex w-full text-[1.3vh] font-neo font-bold">
            <button
              class="h-full aspect-[1/1] border border-[#707070]"
              :class="isChecked ? 'bg-blue-500' : 'bg-white'"
              @click="isChecked = !isChecked"
            >
              <CheckIcon class="text-white"></CheckIcon>
            </button>
            <div class="ml-[30px]">[필수] 개인정보활용에 동의합니다.</div>
            <button class="ml-[30px] text-[#EC3F3F]">자세히 보기</button>
          </div>

          <button
            class="bg-[#EC3F3F] w-full h-[4.2vh] text-white text-[2vh] flex justify-center items-center rounded-full"
          >
            인증하기
          </button>

          <div class="text-[1.3vh] font-neo font-bold">
            개인정보는 투표 종료 후 안전하게 삭제됩니다.
          </div>
        </div>
      </div>

      <Transition
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div
          v-if="isVoteActive"
          class="font-tmon text-center py-[4vh] w-full h-full flex items-center ju flex-col text-[3vh] gap-[20%]"
        >
          <div>
            투표가 완료되었습니다.<br />
            감사합니다.
          </div>
          <div
            class="flex text-[3.5vh] items-center justify-center w-[40%] aspect-[23/14] bg-white rounded-[2vh]"
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
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
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
      isSms: false,
      isChecked: false,
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
    CheckIcon,
  },
};
</script>

<style scoped>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

.font-neo {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
</style>
