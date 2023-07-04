<template>
  <main>
    <TitleBox></TitleBox>
    <Transition
      appear
      enter-from-class="opacity-0 translate-y-10"
      enter-active-class="transition-all duration-500"
    >
      <div
        v-if="service"
        class="font-miwon h-[7.4vh] text-white flex justify-center items-center flex-col mt-[0.3vh] delay-[250ms]"
        :style="{
          textShadow: '0.6vw 0.6vw 4px #000000',
          '-webkit-text-stroke': '0.2vw black',
        }"
      >
        <div class="w-full text-center text-[8.3vw]">
          {{ service.subtitle }}
        </div>
      </div>
    </Transition>
    <div v-if="!service" class="w-full text-center h-[7.7vh]"></div>
    <div
      class="text-[3.5vw] mt-[15.2vh] leading-[4.5vw] flex justify-center items-center flex-col gap-[7.5vh]"
    >
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-5"
        enter-active-class="transition-all"
      >
        <div
          class="w-[59vw] aspect-[64/42] duration-700 delay-[0.3s] rounded-[5vw] bg-[#FDFFE3] flex p-[1vh] items-center flex-col"
        >
          <div
            class="w-[40vw] flex-1 flex items-center justify-center font-tmon text-center break-words"
          >
            <span v-html="voteTitle"></span>
          </div>
          <div class="flex-1">
            <VoteButton
              width="50vw"
              aspect-ratio="11/3"
              text="투표하러 가기"
              @on-click-event="$router.push('/vote')"
            ></VoteButton>
          </div>
        </div>
      </Transition>
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-5"
        enter-active-class="transition-all "
      >
        <div
          class="w-[59vw] aspect-[64/42] duration-700 delay-[0.35s] rounded-[5vw] bg-[#FDFFE3] flex p-[1vh] items-center flex-col"
        >
          <div
            class="w-[40vw] flex-1 flex items-center justify-center font-tmon text-center break-words"
          >
            <span v-html="makeTitle"></span>
          </div>
          <div class="flex-1 flex items-center">
            <VoteButton
              width="50vw"
              aspect-ratio="11/3"
              text="투표현황 보러가기"
            ></VoteButton>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<script>
import VoteButton from "../components/voteButton.vue";
import TitleBox from "../components/TitleBox.vue";
import { Service } from "../service/Repository";
export default {
  data() {
    return {
      service: null,
      voteTitle: "지금 바로<br>당신의 캐릭터에게<br>투표하세요!",
      makeTitle: "TOP 5 캐릭터를<br>만나보세요!",
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const service = await Service.GetDocumentSetting();
      this.service = service.data;
    },
  },
  components: { VoteButton, TitleBox },
};
</script>
