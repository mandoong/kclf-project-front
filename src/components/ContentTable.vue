<template>
  <div>
    <div
      class="overflow-y-scroll relative max-h-[650px] shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300"
    >
      <table class="w-full">
        <thead class="bg-[#59677e] text-white sticky top-0 z-20">
          <slot name="head"></slot>
        </thead>
        <tbody class="divide-y divide-gray-300 bg-white">
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
