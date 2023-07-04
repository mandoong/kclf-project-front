<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    height="100%"
    viewBox="0 0 82.164 90.034"
  >
    <defs>
      <clipPath id="clip-path">
        <rect
          id="사각형_16"
          data-name="사각형 16"
          width="82.164"
          height="90.034"
          transform="translate(0 0)"
          fill="none"
        />
      </clipPath>
    </defs>
    <g id="그룹_25" data-name="그룹 25" transform="translate(0 0)">
      <g id="그룹_16" data-name="그룹 16" clip-path="url(#clip-path)">
        <path
          id="패스_28"
          data-name="패스 28"
          d="M40.925,15.215C43.548,8.185,47.955,0,60.548,0,72.09,0,82.164,7.66,82.164,23.61c0,16.79-24.764,48.9-41.449,66.424C24.03,73.664,0,42.5,0,21.616,0,9.653,8.71,0,21.2,0,33.475,0,38.092,7.975,40.715,14.586Z"
          fill="#ff485a"
        />
      </g>
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
