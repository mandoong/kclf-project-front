<template>
  <main>
    <div
      class="relative flex justify-center items-center"
      :style="{
        width: width,
        height: height,
        aspectRatio: aspectRatio,
      }"
    >
      <IconButtonBorder class="absolute w-full"></IconButtonBorder>
      <IconButton class="absolute w-[95%]"></IconButton>

      <div
        class="flex font-tmon text-[3vh] w-full h-full text-[#656DF3] justify-center items-center z-10"
        :style="{ '-webkit-text-stroke': '0.1vh white' }"
        @click="$emit('onClickEvent')"
      >
        {{ text }}
      </div>
    </div>
  </main>
</template>

<script>
import IconButtonBorder from "../assets/icon/IconButtonBorder.vue";
import IconButton from "../assets/icon/IconButton.vue";
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
  components: { IconButtonBorder, IconButton },
};
</script>
