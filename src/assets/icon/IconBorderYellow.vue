<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    height="100%"
    viewBox="0 0 142 142"
  >
    <g
      id="사각형_40"
      data-name="사각형 40"
      fill="#fdffe3"
      stroke="#ffda22"
      stroke-width="3"
      stroke-dasharray="10 10"
    >
      <rect width="142" height="142" rx="41" stroke="none" />
      <rect x="1.5" y="1.5" width="139" height="139" rx="39.5" fill="none" />
    </g>
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
