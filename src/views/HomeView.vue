<template>
  <main>
    <div
      class="font-miwon text-white flex justify-center items-center flex-col"
      :style="{
        textShadow: '0.5vw 0.5vw 6px #000000',
        '-webkit-text-stroke': '0.4vw black',
      }"
    >
      <div class="w-full text-center text-[8.3vw]">루키프로젝트 선발전</div>
    </div>
    <div
      class="text-[4.2vw] mt-[12.5vh] flex justify-center items-center flex-col gap-[7.5vh]"
    >
      <div
        class="w-[78vw] aspect-[42/23] rounded-[5vw] bg-[#FDFFE3] flex p-[1vh] items-center flex-col gap-[1vh]"
      >
        <div
          class="w-[40vw] flex-1 flex items-center justify-center font-tmon text-center break-words"
        >
          <span v-html="voteTitle"></span>
        </div>
        <div class="flex-1">
          <VoteButton
            width="58vw"
            aspect-ratio="62/17"
            text="투표하러 가기"
            @on-click-event="$router.push('/vote')"
          ></VoteButton>
        </div>
      </div>
      <div
        class="w-[78vw] aspect-[42/23] rounded-[5vw] bg-[#FDFFE3] flex p-[1vh] items-center flex-col gap-[1vh]"
      >
        <div
          class="w-[40vw] flex-1 flex items-center justify-center font-tmon text-center break-words"
        >
          <span v-html="makeTitle"></span>
        </div>
        <div class="flex-1 flex items-center">
          <VoteButton
            width="58vw"
            aspect-ratio="62/17"
            text="굿즈만들러 가기"
          ></VoteButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import VoteButton from "../components/voteButton.vue";
export default {
  data() {
    return {
      voteTitle: "지금 바로<br>당신의 캐릭터에게<br>투표하세요!",
      makeTitle: "당신이 뽑은 캐릭터로<br>굿즈를 만들어 보세요.",
    };
  },
  components: { VoteButton },
};
</script>
