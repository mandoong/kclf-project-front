<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 39 39"
  >
    <g id="그룹_1" data-name="그룹 1" transform="translate(-309 -463)">
      <circle
        id="타원_20"
        data-name="타원 20"
        cx="19.5"
        cy="19.5"
        r="19.5"
        transform="translate(309 463)"
        fill="#fcff6e"
      />
      <path
        id="패스_55"
        data-name="패스 55"
        d="M3.555-22.05h-6.81l1.02,19.59h4.74ZM3.225,4.2V-.3H-3.1V5.76H1.4C2.625,5.76,3.225,5.25,3.225,4.2Z"
        transform="translate(329 490)"
      />
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
