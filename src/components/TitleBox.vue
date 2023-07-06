<template>
  <main>
    <div
      v-if="service"
      class="font-miwon text-white flex justify-center items-center flex-col"
      :style="{
        textShadow: '0.4vh 0.4vh 4px #000000',
        '-webkit-text-stroke': '0.1vh black',
      }"
    >
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div v-if="service" class="flex-1 text-center text-[4.7vh]">
          {{ service.title }}
        </div>
      </Transition>
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div
          v-if="service"
          class="flex-1 delay-[200ms] -mt-[1%] text-center text-[4.7vh]"
        >
          {{ service.year }}
        </div>
      </Transition>
    </div>

    <div v-if="!service">
      <div class="w-full h-full"></div>
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
