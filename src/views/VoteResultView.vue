<template>
  <main class="w-full h-full flex flex-col">
    <div
      v-if="service"
      class="font-miwon h-[14%] text-white flex justify-center items-center flex-col gap-1"
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

    <div v-if="!service" class="h-[14%]"></div>
    <div
      class="font-miwon h-[5%] leading-[3vh] text-[#FFDA22] flex justify-center items-center flex-col text-center text-[3.3vh]"
      :style="{
        textShadow: '0.3vh 0.3vh 6px #000000',

        '-webkit-text-stroke': '0.1vh black',
      }"
    >
      TOP 5
    </div>

    <div
      v-if="characters"
      class="flex flex-col w-full h-[81%] py-[10%] gap-[3%]"
    >
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-[10vh]"
        enter-active-class="transition-all duration-500"
      >
        <div class="w-full h-[40%] flex justify-center delay-300">
          <div class="h-full aspect-square relative flex justify-center">
            <img
              class="absolute -top-[15%] z-10 w-[45%]"
              src="../assets/crown.png"
            />
            <div
              class="absolute w-[40%] text-center text-[2vh] font-tmon -top-[3%] z-20"
            >
              TOP1
            </div>
            <CharacterBox
              v-if="characters[0]"
              class="w-full aspect-square"
              :character="characters[0]"
              :isResult="true"
            ></CharacterBox>
          </div>
        </div>
      </Transition>
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-[10vh]"
        enter-active-class="transition-all duration-500"
      >
        <div
          class="h-[30%] flex justify-center w-full px-[10%] gap-[10%] delay-150"
        >
          <div class="h-full aspect-square">
            <CharacterBox
              v-if="characters[1]"
              class="w-full aspect-square"
              :character="characters[1]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
          <div class="h-full aspect-square">
            <CharacterBox
              v-if="characters[2]"
              class="w-full aspect-square"
              :character="characters[2]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
        </div>
      </Transition>
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-[10vh]"
        enter-active-class="transition-all duration-500"
      >
        <div class="h-[30%] flex w-full justify-center w px-[10%] gap-[10%]">
          <div class="h-full aspect-square">
            <CharacterBox
              v-if="characters[3]"
              class="w-full aspect-square"
              :character="characters[3]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
          <div class="h-full aspect-square">
            <CharacterBox
              v-if="characters[4]"
              class="w-full aspect-square"
              :character="characters[4]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<script>
import { Character, Service } from "../service/Repository";
import CharacterBox from "../components/CharacterBox.vue";

export default {
  data() {
    return {
      service: null,
      characters: null,
      count: null,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const service = await Service.GetDocumentSetting();
      const characters = await Character.GetTopVoteCharacter();
      const count = await Character.GetVoteResultCount();

      this.service = service.data;
      this.characters = characters.data;
      this.count = count.data.voteCount;
    },
  },
  components: { CharacterBox },
};
</script>
