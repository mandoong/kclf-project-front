<template>
  <main>
    <div
      class="p-[1.5vw]"
      :style="{
        width: width,
        aspectRatio: aspectRatio,
        backgroundImage: `url(${buttonBorder})`,
        backgroundSize: '100% 100% ',
      }"
    >
      <div
        class="w-full h-full bg-center rounded-[4vw] bg-cover"
        :style="{
          backgroundImage: `url(${buttonColor})`,
          backgroundSize: '100% 100% ',
        }"
      >
        <div
          class="flex font-tmon text-[7vw] w-full h-full text-[#656DF3] justify-center items-center"
          :style="{ '-webkit-text-stroke': '0.1vw white' }"
          @click="$emit('onClickEvent')"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonBorder from "../assets/패스3.png";
import ButtonColor from "../assets/사각형5.png";

export default {
  props: {
    width: null,
    height: null,
    text: null,
    aspectRatio: null,
  },
  data() {
    return {
      buttonBorder: ButtonBorder,
      buttonColor: ButtonColor,
    };
  },
};
</script>
