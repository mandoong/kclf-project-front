<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 216.023 214.553"
  >
    <g
      id="타원_14"
      data-name="타원 14"
      fill="rgba(255,255,255,0.2)"
      stroke="#ffda22"
      stroke-width="15"
    >
      <ellipse
        cx="108.012"
        cy="107.276"
        rx="108.012"
        ry="107.276"
        stroke="none"
      />
      <ellipse cx="108.012" cy="107.276" rx="100.512" ry="99.776" fill="none" />
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
