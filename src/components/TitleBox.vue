<template>
  <main>
    <div
      v-if="service"
      class="font-miwon h-[31vw] text-white flex justify-center items-center flex-col gap-1"
      :style="{
        textShadow: '0.6vw 0.6vw 4px #000000',
        '-webkit-text-stroke': '0.2vw black',
      }"
    >
      <TransitionGroup
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div v-if="service" class="w-full text-center mt-[5vh] text-[8.3vw]">
          {{ service.title }}
        </div>
        <div
          v-if="service"
          class="w-full delay-100 -mt-[1vh] text-center text-[8.3vw]"
        >
          {{ service.year }}
        </div>
      </TransitionGroup>
    </div>

    <div v-if="!service">
      <div class="w-full h-[31vw]"></div>
    </div>
  </main>
</template>

<script>
import { Service } from "../service/Repository";

export default {
  data() {
    return {
      service: null,
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
};
</script>
