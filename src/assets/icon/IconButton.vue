<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    viewBox="0 0 392 125"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        y1="0.5"
        x2="1"
        y2="0.5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#78f0c4" />
        <stop offset="1" stop-color="#20a4f2" />
      </linearGradient>
    </defs>
    <rect
      id="사각형_5"
      data-name="사각형 5"
      width="392"
      height="125"
      rx="41"
      fill="url(#linear-gradient)"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
  },
};
</script>
