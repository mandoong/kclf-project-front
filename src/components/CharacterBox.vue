<template>
  <main class="relative w-full h-full flex justify-center items-center">
    <IconNotice
      width="3.7vw"
      class="absolute top-[1vh] right-[2vw] z-10"
      @click="$emit('onModal')"
    ></IconNotice>
    <img
      :src="character.title_image"
      class="absolute rounded-full w-[75%] aspect-square bottom-[2vh]"
    />
    <img src="../assets/TagIcon.png" class="absolute w-[92%] bottom-0" />

    <div class="absolute text-[2vw] font-tmon bottom-0">
      {{ character.name }}
    </div>
  </main>
</template>

<script>
import IconNotice from "../assets/icon/IconNotice.vue";

export default {
  props: {
    character: null,
  },
  components: {
    IconNotice,
  },
};
</script>
