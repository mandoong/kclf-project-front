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
      class="font-miwon mt-[1vh] leading-[3vh] text-[#FFDA22] flex justify-center items-center flex-col text-center text-[5.5vw]"
      :style="{
        textShadow: '0.5vw 0.5vw 6px #000000',

        '-webkit-text-stroke': '0.15vw black',
      }"
    >
      TOP 5
    </div>

    <div
      v-if="characters"
      class="flex flex-col w-full h-[70vh] mt-[10%] gap-[3%]"
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
              class="absolute w-[40%] text-center text-[3vw] font-tmon -top-[3%] z-20"
            >
              TOP1
            </div>
            <CharacterBox
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
              class="w-full aspect-square"
              :character="characters[1]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
          <div class="h-full aspect-square">
            <CharacterBox
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
              class="w-full aspect-square"
              :character="characters[3]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
          <div class="h-full aspect-square">
            <CharacterBox
              class="w-full aspect-square"
              :character="characters[4]"
              :isResult="true"
              :isResultSub="true"
            ></CharacterBox>
          </div>
        </div> </Transition
      >s
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
