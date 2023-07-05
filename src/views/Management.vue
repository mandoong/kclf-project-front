<template>
  <div class="bg-gray-100 w-screen h-screen relative">
    <div @click.stop class="flex-1 bg-gray-100 p-4">
      <button
        class="w-10 h-10 mb-4 hidden pc:block"
        @click.stop="onMenus = !onMenus"
      >
        <Bars3Icon class="h-12 w-12 text-gray-500" />
      </button>
      <div class="mt-10 mx-10 h-[80vh] text-[#6f7e95] hidden pc:block">
        <router-view />
      </div>
      <div
        class="mt-10 mx-10 h-[80vh] flex justify-center items-center text-[#6f7e95] pc:hidden"
      >
        <div>
          해당 페이지는 PC에서만<br />
          확인가능합니다.
        </div>
      </div>
    </div>
    <div
      @click.stop
      class="w-96 h-full top-0 bg-gray-700 absolute z-20 transition-all duration-200"
      :class="onMenus ? 'left-0' : '-left-96'"
    >
      <div class="flex gap-6 h-20 bg-[#2b3647] p-4">
        <Bars3Icon
          class="h-12 w-12 text-gray-500"
          @click="onMenus = !onMenus"
        />
        <div
          class="text-xl flex items-center text-slate-200"
          @click="$router.push('/')"
        >
          관리자 페이지
        </div>
      </div>

      <div
        @click.stop
        v-for="item in menus"
        :key="item"
        class="border-b border-slate-400 p-4"
      >
        <div class="text-lg text-slate-400 mb-4">{{ item.title }}</div>
        <div v-for="menu in item.option" :key="menu">
          <button
            class="hover:bg-slate-600 text-xl w-full text-left rounded-md px-2 mb-4"
            :class="
              location === menu.href ? 'text-slate-100 ' : 'text-slate-200 '
            "
            @click="onClickRoute(menu.href), (onMenus = false)"
          >
            {{ menu.name }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="onMenus"
      class="absolute w-screen h-screen top-0 bg-black/[20%] z-10 transition-all duration-300"
    ></div>
  </div>
</template>

<script>
import { Bars3Icon } from "@heroicons/vue/24/solid";
export default {
  props: {
    onMenus: false,
  },
  data() {
    return {
      location: "/",
      menus: [
        {
          title: "캐릭터",
          option: [
            { name: "전체 캐릭터", href: "/_admin/character", img: "" },
            { name: "캐릭터 등록", href: "/_admin/create", img: "" },
          ],
        },
        {
          title: "문서",
          option: [{ name: "문서 편집", href: "/_admin/document", img: "" }],
        },
        {
          title: "이벤트",
          option: [{ name: "이벤트 페이지 바로가기", href: "/", img: "" }],
        },
      ],
    };
  },
  mounted() {
    this.location = window.localStorage.getItem("location") || "/";
  },
  methods: {
    onClickRoute(href) {
      window.localStorage.setItem("location", href);
      this.location = href;
      this.$router.push(href);
    },
  },
  components: { Bars3Icon },
};
</script>
