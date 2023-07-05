<template>
  <header
    class="w-screen h-screen bg-cover overflow-y-scroll scrollbar-none"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <RouterView />
  </header>
</template>

<script>
import BackgroundImage from "./assets/배경2_대지1-06@2x.png";
import { Service } from "./service/Repository";

export default {
  data() {
    return {
      bg: BackgroundImage,
    };
  },

  mounted() {
    // this.fetch()
  },

  methods: {
    async fetch() {
      const background = Service.GetDocumentSetting();
      this.bg = background.data.background_image;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "miwon";
  src: url("./assets/font/양진체v0.9_ttf.ttf");
}

@font-face {
  font-family: "tmon";
  src: url("./assets/font/TMONMONSORI.TTF.TTF");
}

.font-miwon {
  font-family: "miwon", sans-serif;
}

.font-tmon {
  font-family: "tmon", sans-serif;
}
</style>
