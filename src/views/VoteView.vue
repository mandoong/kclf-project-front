<template>
  <main>
    <div
      v-if="service"
      class="font-miwon text-white flex justify-center items-center flex-col gap-1"
      :style="{
        textShadow: '0.6vw 0.6vw 4px #000000',
        '-webkit-text-stroke': '0.2vw black',
      }"
    >
      <div class="w-full text-center mt-[1.6vh] text-[7.4vw]">
        {{ service.title }}
      </div>
      <div class="w-full -mt-[1vh] text-center text-[7.4vw]">
        {{ service.year }}
      </div>
    </div>
    <div v-if="!service" class="h-[12.5vh]"></div>
    <div
      class="font-miwon mt-[0.3vh] leading-[3vh] text-[#FFDA22] flex justify-center items-center flex-col text-center text-[3.8vw]"
      :style="{
        textShadow: '0.5vw 0.5vw 6px #000000',

        '-webkit-text-stroke': '0.15vw black',
      }"
    >
      3개의 캐릭터를 골라 투표해주세요.<br />
      캐릭터를 누르면 하트가 나타나요.
    </div>

    <div class="w-full flex justify-center gap-[2.7%]">
      <div class="w-[5.8%]">
        <LeftArrow width="100%" :onStroke="true"></LeftArrow>
      </div>
      <div class="flex justify-center items-center flex-col mt-[0.5vh]">
        <div
          class="w-[78vw] h-[68vh] py-[1vh] px-[2vw] rounded-[5vw] bg-[#FDFFE3]"
        >
          <div
            v-if="characters"
            class="w-full h-full grid grid-cols-3 grid-rows-5"
          >
            <div v-for="item in characters" :key="item">
              <CharacterBox
                :character="item"
                @onModal="onClickOnModal(item)"
              ></CharacterBox>
            </div>
          </div>
          <div
            v-if="!characters"
            class="w-full h-full flex justify-center items-center"
          >
            <iconSpinner class="w-32"></iconSpinner>
          </div>
        </div>
      </div>
      <div class="w-[5.8%]">
        <RightArrow width="100%" :onStroke="true"></RightArrow>
      </div>
    </div>

    <div class="w-full mt-[2vh] flex justify-center">
      <div class="w-[78vw] flex gap-[4%]">
        <div class="flex flex-1 gap-[3%]">
          <div
            class="flex-1 flex justify-center items-center relative bg-[#FDFFE3] font-tmon text-[2.5vw] rounded-[30%]"
          >
            <IconBorderYellow
              class="absolute w-full"
              with="100%"
            ></IconBorderYellow>
            <div class="z-10">PICK</div>
          </div>
          <div
            class="flex-1 flex justify-center items-center relative bg-[#FDFFE3] font-tmon text-[2.5vw] rounded-[30%]"
          >
            <IconBorderYellow
              class="absolute w-full"
              with="100%"
            ></IconBorderYellow>
            <div class="z-10">PICK</div>
          </div>
          <div
            class="flex-1 flex justify-center items-center relative bg-[#FDFFE3] font-tmon text-[2.5vw] rounded-[30%]"
          >
            <IconBorderYellow
              class="absolute w-full"
              with="100%"
            ></IconBorderYellow>
            <div class="z-10">PICK</div>
          </div>
        </div>
        <button
          class="flex w-[30vw] aspect-[32/14] rounded-[2vh] items-center bg-gradient-to-l from-[#20A4F2] to-[#78F0C4]"
        >
          <div
            class="flex font-tmon text-[6vw] w-full h-full text-[#656DF3] justify-center items-center z-10"
            :style="{ '-webkit-text-stroke': '0.1vw white' }"
            @click="$emit('onClickEvent')"
          >
            투표하기
          </div>
        </button>
      </div>
    </div>

    <div v-if="onModal" class="absolute top-0">
      <Modal :character="modalCharacter" @close="onClickClose" />
    </div>
  </main>
</template>

<script>
import TitleBox from "../components/TitleBox.vue";
import IconBorderYellow from "../assets/icon/IconBorderYellow.vue";

import RightArrow from "../assets/icon/RightArrow.vue";
import iconSpinner from "../assets/icon/iconSpinner.vue";
import VoteButton from "../components/voteButton.vue";
import CharacterBox from "../components/CharacterBox.vue";
import LeftArrow from "../assets/icon/LeftArrow.vue";
import RingIcon from "../assets/RingIcon.png";
import TagIcon from "../assets/TagIcon.png";
import NoticeIcon from "../assets/NoticeIcon.png";
import { Character, Service } from "../service/Repository";
import Modal from "../components/Modal.vue";

export default {
  data() {
    return {
      voteTitle: "지금 바로<br>당신의 캐릭터에게<br>투표하세요!",
      makeTitle: "당신이 뽑은 캐릭터로<br>굿즈를 만들어 보세요.",
      ringIcon: RingIcon,
      tagIcon: TagIcon,
      noticeIcon: NoticeIcon,

      onModal: false,
      modalCharacter: null,

      characters: null,

      selectCharacters: [],

      service: null,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    onClickClose() {
      this.onModal = false;
    },

    onClickOnModal(character) {
      this.modalCharacter = character;
      this.onModal = true;
    },

    async fetch() {
      const characters = await Character.GetAllCharacter();
      const service = await Service.GetDocumentSetting();
      this.service = service.data;
      this.characters = characters.data;
    },
  },
  components: {
    VoteButton,
    CharacterBox,
    Modal,
    LeftArrow,
    RightArrow,
    TitleBox,
    iconSpinner,
    IconBorderYellow,
  },
};
</script>
