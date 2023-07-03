<template>
  <div>
    <Subtitle>캐릭터 상세</Subtitle>

    <div class="bg-white w-full h-[80vh] p-10 text-xl flex flex-col">
      <div class="flex h-16 items-center">
        <div class="w-40">캐릭터 이름</div>
        <div>{{ character.name }}</div>
      </div>

      <div class="flex h-16 items-center">
        <div class="w-40">캐릭터 이미지</div>
      </div>

      <div class="flex-1">
        <div
          class="border-2 border-gray-200 w-full rounded-lg grid grid-cols-5 gap-2 mt-10 p-2"
        >
          <div
            class="border-4 rounded-lg aspect-square"
            v-for="url in character.images"
            :key="url"
          >
            <img
              class="w-full h-full object-contain object-center"
              :src="url"
              alt="미리 보기 이미지"
            />
          </div>
        </div>
      </div>
      <div class="w-full h-20 flex justify-center gap-10">
        <button class="bg-blue-500 text-white rounded-md h-16 px-10">
          캐릭터 수정하기
        </button>

        <button class="bg-red-500 text-white rounded-md h-16 px-10">
          캐릭터 삭제하기
        </button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import { Character } from "../../service/Repository";
export default {
  data() {
    return {
      character: { Type: Object },
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const id = this.$route.params.id;
      const character = await Character.GetCharacterById(id);
      if (character.status === 200) {
        this.character = character.data;
      }
    },
  },
  components: { Subtitle },
};
</script>
