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
      <div class="w-full flex mt-[1.7vh]">
        <div class="w-[15%]"></div>
        <div class="flex-1 text-center text-[7.4vw]">
          {{ service.title }}
        </div>
        <div class="w-[15%] flex justify-center items-center">
          <button class="w-[35%]" @click="$router.push('/')">
            <img
              class="w-full aspect-square"
              src="../assets/iconmonstr-home-4-240.png"
            />
          </button>
        </div>
      </div>
      <div class="w-full -mt-[1vh] text-center text-[7.4vw]">
        {{ service.year }}
      </div>
    </div>
    <div v-if="!service" class="h-[13.4vh]"></div>
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
        <LeftArrow
          width="100%"
          :onStroke="true"
          color="#FFDA22"
          @click="onClickPrevCharacterList"
        ></LeftArrow>
      </div>
      <div class="flex justify-center items-center flex-col mt-[0.5vh]">
        <div
          class="w-[78vw] aspect-[84/130] py-[1vh] px-[2vw] rounded-[5vw] bg-[#FDFFE3]"
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
            <iconSpinner class="w-32"></iconSpinner>
          </div>
        </div>
      </div>
      <div class="w-[5.8%]">
        <RightArrow
          width="100%"
          :onStroke="true"
          color="#FFDA22"
          @click="onClickNextCharacterList"
        ></RightArrow>
      </div>
    </div>

    <div class="w-full mt-[2vh] flex justify-center">
      <div class="w-[78vw] flex gap-[4%]">
        <div class="flex flex-1 gap-[3%]">
          <div
            v-for="(_, index) in Array(3)"
            :key="index"
            class="flex-1 flex justify-center items-center relative bg-[#FDFFE3] font-tmon text-[2.5vw] rounded-[30%]"
          >
            <IconBorderYellow
              class="absolute w-full"
              with="100%"
            ></IconBorderYellow>
            <div
              v-if="selectCharacters[index]"
              class="absolute w-[25%] flex justify-center items-center rounded-full -top-[5%] right-[5%] aspect-square bg-[#FFDA22] z-20"
              @click="onClickSelectCharacter(selectCharacters[index].id)"
            >
              <XMarkIcon class="w-[80%] text-gray-600"></XMarkIcon>
            </div>
            <div v-if="!selectCharacters[index]" class="z-10">PICK</div>

            <div
              class="w-[80%] aspect-square overflow-hidden z-10"
              v-if="selectCharacters[index]"
            >
              <img
                class="w-full aspect-square z-10"
                :src="selectCharacters[index].title_image"
              />
            </div>
          </div>
        </div>
        <button
          class="flex w-[30vw] aspect-[32/14] rounded-[2vh] items-center bg-gradient-to-l from-[#20A4F2] to-[#78F0C4]"
        >
          <div
            class="flex font-tmon text-[6vw] w-full h-full text-[#656DF3] justify-center items-center z-10"
            :style="{ '-webkit-text-stroke': '0.1vw white' }"
            @click="onClickVoteModal"
          >
            투표하기
          </div>
        </button>
      </div>
    </div>

    <div v-if="onModal" class="absolute top-0">
      <Modal :character="modalCharacter" @close="onClickClose" />
    </div>
    <div v-if="onVoteModal" class="absolute top-0">
      <VoteModal
        :count="selectCharacters.length"
        @voteCharacter="onClickVoteCharacter"
        @close="onClickClose"
      />
    </div>
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
      console.log(this.prevCharacters);
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

      if (this.PageCount < max + 2) {
        this.PageCount = this.PageCount + 1;
        this.prevCharacters = this.characters.slice(
          (this.PageCount - 1) * 15,
          this.PageCount * 15 > this.characters.length
            ? this.characters.length
            : this.PageCount * 15
        );
        console.log(max, this.prevCharacters);
      }
    },

    onClickSelectCharacter(id) {
      if (this.selectCharacters.some((e) => e.id === id)) {
        this.selectCharacters = this.selectCharacters.filter(
          (e) => e.id !== id
        );
        console.log(this.selectCharacters);
      } else {
        if (this.selectCharacters.length < 3) {
          const character = this.characters.find((e) => e.id === id);
          this.selectCharacters.push(character);
          console.log(this.selectCharacters);
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
