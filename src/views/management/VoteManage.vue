<template>
  <main>
    <Subtitle :isBack="true">투표 관리</Subtitle>

    <div class="bg-white w-full p-10 text-xl flex flex-col">
      <div class="font-bold">현재 Top 5 캐릭터</div>
      <br />
      <div class="flex">
        <div class="w-20">순위</div>
        <div class="w-48">캐릭터 이름</div>
        <div>득표수</div>
      </div>
      <hr class="my-2" />
      <div class="flex" v-for="(character, i) in characters" :key="character">
        <div class="w-20">{{ i + 1 }}</div>
        <div class="w-48">{{ character.name }}</div>
        <div>
          {{ character.vote_count }}
        </div>
      </div>
      <div v-if="!characters.length" class="my-10">
        현재 투표수가 없어 데이터를 표시할 수 없습니다.
      </div>
      <br />
      <br />
      <div class="flex gap-4">
        <div>
          <button
            class="w-48 h-16 flex justify-center items-center rounded-lg bg-blue-500 text-white"
            @click="$router.push('/home/vote/result')"
          >
            결과 페이지 <br />
            미리 보기
          </button>
        </div>
        <div>
          <button
            class="w-48 h-16 flex justify-center items-center rounded-lg bg-red-500 text-white"
            @click="onClickOnModal"
          >
            투표수 초기화
          </button>
        </div>
      </div>
    </div>

    <ManagerModal
      :onModal="onModal"
      :onButton="true"
      @close="onModal = false"
      @submit="onClickClearVoteCount"
    >
      <div
        class="h-32 flex justify-center items-center text-center text-red-500"
      >
        정말로 투표수를 초기화 하시겠습니까? <br />
        <br />
        초기화 이후 복구 할수 없습니다.<br /></div
    ></ManagerModal>
  </main>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import { Character } from "../../service/Repository";
import ManagerModal from "../../components/ManagerModal.vue";
export default {
  data() {
    return {
      characters: null,
      onModal: false,
    };
  },
  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const characters = await Character.GetTopVoteCharacter();

      if (characters.status === 200) {
        this.characters = characters.data;
      }
    },

    onClickOnModal() {
      this.onModal = true;
    },
    async onClickClearVoteCount() {
      await Character.CharacterVoteCountClear();

      this.onModal = false;
    },
  },
  components: { Subtitle, ManagerModal },
};
</script>
