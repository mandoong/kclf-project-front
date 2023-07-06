<template>
  <main class="h-full w-full flex flex-col justify-between">
    <div class="w-full h-[5%]"></div>
    <TitleBox class="h-[15%]"></TitleBox>
    <Transition
      appear
      enter-from-class="opacity-0 translate-y-10"
      enter-active-class="transition-all duration-500"
    >
      <div
        v-if="service"
        class="font-miwon h-[24.5%] text-white flex justify-center mt-[0.3vh] delay-[250ms]"
        :style="{
          textShadow: '0.4vh 0.4vh 4px #000000',
          '-webkit-text-stroke': '0.1vh black',
        }"
      >
        <div class="w-full text-center text-[4.7vh]">
          {{ service.subtitle }}
        </div>
      </div>
    </Transition>
    <div v-if="!service" class="w-full h-[24.5%] text-center"></div>
    <div
      class="text-[2.1vh] flex-1 leading-[2.7vh] flex justify-between items-center flex-col gap-[10%]"
    >
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-5"
        enter-active-class="transition-all"
      >
        <div
          class="flex-1 aspect-[64/42] duration-700 delay-[0.3s] rounded-[2.8vh] bg-[#FDFFE3] p-[1.5vh] flex items-center flex-col"
        >
          <div
            class="flex-1 flex items-center justify-center font-tmon text-center break-words"
          >
            <span v-html="voteTitle"></span>
          </div>
          <div class="flex-1 w-full flex items-end">
            <VoteButton
              class="flex-1"
              width="100%"
              aspect-ratio="11/3"
              text="투표하러 가기"
              @on-click-event="$router.push('/home/vote')"
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
          class="flex-1 aspect-[64/42] duration-700 delay-[0.35s] rounded-[2.8vh] bg-[#FDFFE3] p-[1.5vh] flex items-center flex-col"
        >
          <div
            class="flex-1 flex items-center justify-center font-tmon text-center break-words"
          >
            <span v-html="makeTitle"></span>
          </div>
          <div class="flex-1 w-full flex items-end">
            <VoteButton
              class="flex-1"
              width="100%"
              aspect-ratio="11/3"
              text="투표현황 보러가기"
              @on-click-event="$router.push('/home/vote/rank')"
            ></VoteButton>
          </div>
        </div>
      </Transition>
    </div>
    <div class="w-full h-[11%]"></div>
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
