<template>
  <main>
    <div
      class="font-miwon -mt-[1vh] text-[#FFDA22] flex justify-center items-center flex-col text-center text-[3.8vw]"
      :style="{
        textShadow: '0.5vw 0.5vw 6px #000000',

        '-webkit-text-stroke': '0.15vw black',
      }"
    >
      최대 3개의 캐릭터에 투표해주세요.
    </div>
    <div class="w-full flex justify-center gap-[2.7%]">
      <div class="w-[5.8%]">
        <LeftArrow width="100%" :onStroke="true"></LeftArrow>
      </div>
      <div class="flex justify-center items-center flex-col mt-[0.5vh]">
        <div
          class="w-[78vw] h-[68vh] py-[1vh] px-[2vw] grid grid-cols-3 grid-rows-5 rounded-[5vw] bg-[#FDFFE3]"
        >
          <div v-for="character in characters" :key="character">
            <CharacterBox :character="character"></CharacterBox>
          </div>
        </div>
      </div>
      <div class="w-[5.8%]">
        <RightArrow width="100%" :onStroke="true"></RightArrow>
      </div>
    </div>
    <div class="w-full h-[10vh] flex px-[10vw]">
      <div class="w-full flex flex-1">
        <div
          class="flex-1"
          v-for="character in selectCharacters"
          :key="character"
        >
          <CharacterBox :character="character"></CharacterBox>
        </div>
      </div>
      <div class="flex items-center">
        <VoteButton
          width="40vw"
          aspect-ratio="42/15"
          text="투표하기"
          @onClickEvent="onModal = true"
        ></VoteButton>
      </div>
    </div>

    <div v-if="onModal" class="absolute top-0">
      <Modal @close="onClickClose" />
    </div>
  </main>
</template>

<script>
import Modal from "../components/Modal.vue";
import RightArrow from "../assets/icon/RightArrow.vue";
import VoteButton from "../components/voteButton.vue";
import CharacterBox from "../components/CharacterBox.vue";
import LeftArrow from "../assets/icon/LeftArrow.vue";
import RingIcon from "../assets/RingIcon.png";
import TagIcon from "../assets/TagIcon.png";
import NoticeIcon from "../assets/NoticeIcon.png";

export default {
  data() {
    return {
      voteTitle: "지금 바로<br>당신의 캐릭터에게<br>투표하세요!",
      makeTitle: "당신이 뽑은 캐릭터로<br>굿즈를 만들어 보세요.",
      ringIcon: RingIcon,
      tagIcon: TagIcon,
      noticeIcon: NoticeIcon,

      onModal: false,

      characters: [
        { name: "꾸버", img: "" },
        { name: "하트버니", img: "" },
        { name: "킹냥", img: "" },
        { name: "먹보", img: "" },
        { name: "아라찌", img: "" },
        { name: "띠라노", img: "" },
        { name: "베어", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
        { name: "미애옹", img: "" },
      ],

      selectCharacters: [
        { name: "꾸버", img: "" },
        { name: "하트버니", img: "" },
        { name: "킹냥", img: "" },
      ],
    };
  },

  methods: {
    onClickClose() {
      this.onModal = false;
    },
  },
  components: { VoteButton, CharacterBox, Modal, LeftArrow, RightArrow },
};
</script>
