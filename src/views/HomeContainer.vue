<template>
  <header class="w-screen h-screen">
    <div
      v-if="service"
      class="h-full max-w-[1080px] bg-cover bg-no-repeat bg-center mx-auto"
      :style="{
        backgroundImage: `url(${
          isPage.startsWith('/home/vote')
            ? service.sub_background_image
            : service.title_background_image
        })`,
      }"
    >
      <RouterView />
    </div>
  </header>
</template>

<script>
import { Service } from "../service/Repository";

export default {
  data() {
    return {
      service: null,
      isPage: "",
    };
  },

  watch: {
    $route(to) {
      this.isPage = to.fullPath;
    },
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const background = await Service.GetDocumentSetting();

      this.service = background.data;
      this.isPage = this.$route.fullPath;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "miwon";
  src: url("../assets/font/양진체v0.9_ttf.ttf");
}

@font-face {
  font-family: "tmon";
  src: url("../assets/font/TMONMONSORI.TTF.TTF");
}

.font-miwon {
  font-family: "miwon", sans-serif;
}

.font-tmon {
  font-family: "tmon", sans-serif;
}
</style>
