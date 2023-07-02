<template>
  <header
    class="w-screen h-screen bg-cover overflow-hidden"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <div
      class="font-miwon text-white flex justify-center items-center flex-col gap-1"
      :style="{
        textShadow: '0.8vw 0.6vw 6px #000000',
        '-webkit-text-stroke': '0.4vw black',
      }"
    >
      <div class="w-full text-center mt-[3.8vh] text-[9.3vw]">
        캐릭터 라이선싱 페어
      </div>
      <div class="w-full -mt-[1.8vh] text-center text-[9.3vw]">2023</div>
    </div>
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
