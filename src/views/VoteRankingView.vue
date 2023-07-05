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
      투표 현황
    </div>

    <div class="w-full h-[78vh] px-[5%] mt-[3%]">
      <div class="w-full h-full grid grid-rows-5">
        <div
          v-for="(item, i) in characters"
          :key="item"
          class="relative flex items-center flex-1 w-full"
        >
          <div class="h-full p-[1vh] aspect-square z-10">
            <CharacterBox :character="item" :isResult="true"></CharacterBox>
          </div>
          <div
            class="absolute w-full h-full flex items-center pl-[10vh] gap-[5%]"
          >
            <Transition
              appear
              enter-from-class="opacity-0 -translate-x-[10vh]"
              enter-active-class="transition-all duration-500"
            >
              <div
                class="bg-[#FDFFE3] h-[20%]"
                :style="{
                  width: `${
                    (item.vote_count / characters[0].vote_count) * 100 + 10
                  }%`,
                  transitionDelay: `${i * 100}ms`,
                }"
              ></div>
            </Transition>
            <Transition
              appear
              enter-from-class="opacity-0 -translate-x-[50%]"
              enter-active-class="transition-all duration-500"
            >
              <div
                class="text-[3.5vw] w-[20%] font-tmon text-[#FDFFE3] top-0"
                :style="{
                  transitionDelay: `${i * 100 + 300}ms`,
                }"
              >
                {{ ((item.vote_count / count) * 100).toFixed() }} %
              </div>
            </Transition>
          </div>
        </div>
      </div>
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
