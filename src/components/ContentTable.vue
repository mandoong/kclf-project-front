<template>
  <div>
    <div
      class="overflow-y-scroll text-lg relative max-h-[700px] shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
    >
      <table class="w-full">
        <thead class="bg-[#59677e] text-white sticky top-0">
          <slot name="head"></slot>
        </thead>
        <tbody class="divide-y divide-gray-300 bg-white">
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
