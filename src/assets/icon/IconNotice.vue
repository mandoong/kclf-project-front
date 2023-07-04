<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width"
    viewBox="0 0 39 39"
  >
    <g id="그룹_39" data-name="그룹 39" transform="translate(-309 -463)">
      <circle
        id="타원_20"
        data-name="타원 20"
        cx="19.5"
        cy="19.5"
        r="19.5"
        transform="translate(309 463)"
        fill="#ffda22"
      />
      <text
        id="_"
        data-name="?"
        transform="translate(329 490)"
        font-size="30"
        class="font-tmon"
      >
        <tspan x="-8" y="0">?</tspan>
      </text>
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
