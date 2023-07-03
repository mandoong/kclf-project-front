<template>
  <header
    class="w-screen h-screen bg-cover overflow-hidden"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <RouterView />
  </header>
</template>

<script>
import BackgroundImage from "./assets/배경2_대지1-06@2x.png";

export default {
  data() {
    return {
      bg: BackgroundImage,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "miwon";
  src: url("./assets/font/미원Miwon.otf");
}

@font-face {
  font-family: "tmon";
  src: url("./assets/font/TMONBlack.ttf");
}

.font-miwon {
  font-family: "miwon", sans-serif;
}

.font-tmon {
  font-family: "tmon", sans-serif;
}
</style>
