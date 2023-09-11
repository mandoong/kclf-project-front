<template>
  <main class="w-full h-full flex flex-col justify-between relative">
    <div
      v-if="service"
      class="font-miwon h-[13.4%] text-white flex justify-center items-center flex-col gap-1"
      :style="{
        textShadow: '0.3vh 0.3vh 4px #000000',
        '-webkit-text-stroke': '0.1vh black',
      }"
    >
      <div class="w-full flex-1 items-center flex mt-[1.7vh]">
        <div class="w-[10%]"></div>
        <div class="w-[80%] text-center text-[4.2vh]">
          {{ service.title }}
        </div>
        <div class="w-[10%] h-full flex items-center">
          <button class="h-[50%]" @click="$router.push('/')">
            <img
              class="h-full aspect-square"
              src="../assets/iconmonstr-home-4-240.png"
            />
          </button>
        </div>
      </div>
      <div class="w-full flex-1 -mt-[1vh] text-center text-[4.2vh]">
        {{ service.year }}
      </div>
    </div>
    <div v-if="!service" class="h-[13.4%]"></div>

    <div
      class="font-miwon h-[6%] leading-[2.8vh] text-[#FFDA22] flex justify-center items-center flex-col text-center text-[2vh]"
      :style="{
        textShadow: '0.3vh 0.3vh 4px #000000',

        '-webkit-text-stroke': '0.1vh black',
      }"
    >
      3개의 캐릭터를 골라 투표해주세요.<br />
      캐릭터를 누르면 하트가 나타나요.
    </div>

    <div class="w-full flex-1 flex justify-center gap-[1vh]">
      <div class="w-[5.8%] flex justify-end">
        <LeftArrow
          class="cursor-pointer"
          width="3vh"
          :onStroke="true"
          color="#FFDA22"
          @click="onClickPrevCharacterList"
        ></LeftArrow>
      </div>
      <div
        class="h-full aspect-[84/130] p-[1vh] flex justify-center rounded-[3vh] items-center flex-col mt-[0.5vh] bg-[#FDFFE3]"
      >
        <div
          v-if="characters"
          class="w-full h-full grid grid-cols-3 grid-rows-5"
        >
          <TransitionGroup
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500 "
            leave-active-class="hidden "
          >
            <div
              v-for="(item, i) in prevCharacters"
              :key="item"
              class="-mt-[1vh]"
              :style="{ transitionDelay: `${i * 50}ms` }"
              @click="onClickSelectCharacter(item.id)"
            >
              <CharacterBox
                :character="item"
                @onModal="onClickOnModal(item)"
                :onSelect="selectCharacters.some((e) => e.id === item.id)"
              ></CharacterBox>
            </div>
          </TransitionGroup>
        </div>
        <div
          v-if="!characters"
          class="w-full h-full flex justify-center items-center"
        >
          <iconSpinner class="w-28"></iconSpinner>
        </div>
      </div>
      <div class="w-[5.8%]">
        <RightArrow
          class="cursor-pointer"
          width="3vh"
          :onStroke="true"
          color="#FFDA22"
          @click="onClickNextCharacterList"
        ></RightArrow>
      </div>
    </div>

    <div class="w-full h-[10%] flex justify-center">
      <div class="h-[100%] p-[1vh] flex justify-center gap-[1vh]">
        <div
          v-for="(_, index) in Array(3)"
          :key="index"
          class="h-full aspect-square flex justify-center items-center relative bg-[#FDFFE3] font-tmon text-[1.2vh] rounded-[30%]"
        >
          <IconBorderYellow
            class="absolute w-full"
            with="100%"
          ></IconBorderYellow>
          <div
            v-if="selectCharacters[index]"
            class="absolute w-[25%] flex justify-center items-center rounded-full -top-[5%] right-[0%] aspect-square bg-[#FFDA22] z-20"
            @click="onClickSelectCharacter(selectCharacters[index].id)"
          >
            <XMarkIcon class="text-gray-600"></XMarkIcon>
          </div>
          <div v-if="!selectCharacters[index]" class="z-10">PICK</div>

          <div
            class="aspect-square overflow-hidden z-10 flex justify-center items-center"
            v-if="selectCharacters[index]"
          >
            <img
              class="w-[90%] rounded-full object-cover aspect-square z-0"
              :src="selectCharacters[index].title_image"
            />
          </div>
        </div>
        <button
          class="flex h-full aspect-[32/14] rounded-[2vh] items-center bg-gradient-to-l from-[#20A4F2] to-[#78F0C4]"
        >
          <div
            class="flex font-tmon text-[3vh] w-full h-full text-[#656DF3] justify-center items-center z-10"
            :style="{ '-webkit-text-stroke': '0.1vw white' }"
            @click="onClickVoteModal"
          >
            투표하기
          </div>
        </button>
      </div>
    </div>

    <Modal v-if="onModal" :character="modalCharacter" @close="onClickClose" />

    <VoteModal
      v-if="onVoteModal"
      :count="selectCharacters.length"
      :selectCharacters="selectCharacters"
      @voteCharacter="onClickVoteCharacter"
      @close="onClickClose"
    />
  </main>
</template>

<script>
import TitleBox from "../components/TitleBox.vue";
import IconBorderYellow from "../assets/icon/IconBorderYellow.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
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
import VoteModal from "../components/VoteModal.vue";

export default {
  data() {
    return {
      voteTitle: "지금 바로<br>당신의 캐릭터에게<br>투표하세요!",
      makeTitle: "당신이 뽑은 캐릭터로<br>굿즈를 만들어 보세요.",
      ringIcon: RingIcon,
      tagIcon: TagIcon,
      noticeIcon: NoticeIcon,

      onModal: false,
      onVoteModal: false,
      modalCharacter: null,

      characters: null,

      PageCount: 1,
      prevCharacters: [],

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
      this.onVoteModal = false;
    },

    onClickOnModal(character) {
      this.modalCharacter = character;
      this.onModal = true;
    },

    onClickVoteModal() {
      if (this.selectCharacters.length === 0) {
        return;
      }
      this.onVoteModal = true;
    },

    async fetch() {
      const characters = await Character.GetAllCharacter();
      const service = await Service.GetDocumentSetting();
      this.service = service.data;
      this.characters = characters.data;
      this.prevCharacters = this.characters.slice(0, 15);
    },

    onClickPrevCharacterList() {
      if (this.PageCount > 1) {
        this.PageCount = this.PageCount - 1;
        this.prevCharacters = this.characters.slice(
          (this.PageCount - 1) * 15,
          this.PageCount * 15
        );
      }
    },

    onClickNextCharacterList() {
      const max = parseInt(this.characters.length / 15);

      if (this.PageCount < max + 1) {
        this.PageCount = this.PageCount + 1;
        this.prevCharacters = this.characters.slice(
          (this.PageCount - 1) * 15,
          this.PageCount * 15 > this.characters.length
            ? this.characters.length
            : this.PageCount * 15
        );
      }
    },

    onClickSelectCharacter(id) {
      if (this.selectCharacters.some((e) => e.id === id)) {
        this.selectCharacters = this.selectCharacters.filter(
          (e) => e.id !== id
        );
      } else {
        if (this.selectCharacters.length < 3) {
          const character = this.characters.find((e) => e.id === id);
          this.selectCharacters.push(character);
        }
      }
    },

    async onClickVoteCharacter() {
      const body = this.selectCharacters.map((e) => {
        return e.id;
      });

      await Character.VoteCharacter({ ids: body });
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
    VoteModal,
    XMarkIcon,
  },
};
</script>
