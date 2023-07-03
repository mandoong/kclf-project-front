<template>
  <main class="relative w-full h-full flex justify-center items-center">
    <img src="../assets/RingIcon.png" class="absolute w-[80%]" />
    <img src="../assets/TagIcon.png" class="absolute w-[92%] bottom-[28%]" />
    <img
      src="https://kclf-images.s3.ap-northeast-2.amazonaws.com/character/25_1688376767424.png"
      class="absolute w-[92%] bottom-[28%]"
    />
    <div class="absolute text-[2vw] font-tmon bottom-[28%]">
      {{ character.name }}
    </div>
  </main>
</template>

<script>
export default {
  props: {
    character: null,
  },
};
</script>
