<template>
  <div>
    <Subtitle :isBack="true">캐릭터 상세</Subtitle>

    <div class="bg-white w-full p-10 text-lg flex flex-col">
      <div class="flex h-10 items-center">
        <div class="w-48">캐릭터 이름</div>
        <div>{{ character.name }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">투표 받은 수</div>
        <div>{{ character.vote_count }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">생성 날짜</div>
        <div>{{ character.created_at }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">수정 날짜</div>
        <div>{{ character.updated_at }}</div>
      </div>

      <div class="flex h-10 items-center mt-10">
        <div class="w-48">캐릭터 이미지</div>
      </div>

      <div class="flex-1">
        <div
          class="border-2 border-gray-200 w-full rounded-lg grid grid-cols-10 gap-2 mt-4 p-2"
        >
          <div class="border-4 border-yellow-400 rounded-lg aspect-square">
            <img
              class="w-full h-full object-contain object-center"
              :src="character.title_image"
              alt="미리 보기 이미지"
            />
          </div>
          <div
            class="border-4 rounded-lg aspect-square"
            v-for="url in character.images"
            :key="url"
          >
            <img
              class="w-full h-full object-contain object-center"
              :src="url.image"
              alt="미리 보기 이미지"
            />
          </div>
        </div>
      </div>

      <div class="w-full h-20 flex justify-center gap-10 mt-20">
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
