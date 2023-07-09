<template>
  <main>
    <Subtitle :isBack="true">투표 관리</Subtitle>
    <ManualTextBox>
      <div class="font-bold">투표 관리 메뉴입니다.</div>
      현재 투표 순위를 확인하고 결과 페이지를 미리볼수 있습니다..<br /><br />
      캐릭터 순위 <br />
      <div class="indent-4">
        - 캐릭터 순위는 실시간으로 적용되며 현재 시점에 따른 결과 페이지를
        확인할 수 있습니다.
      </div>
      <div class="indent-4">
        - TOP 5 이후 캐릭터 투표수는 캐릭터 목록에서 확인 가능합니다.
      </div>
      <br />
      투표수 초기화<br />
      <div class="indent-4">
        - 투표수 초기화 시 모든 캐릭터의 득표수를 0으로 만듭니다. 투표 진행
        중에는 유의 하시고 사용 바랍니다.
      </div>
    </ManualTextBox>

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
      <div v-if="characters && !characters.length" class="my-10">
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
import ManualTextBox from "../../components/ManualTextBox.vue";
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
  components: { Subtitle, ManagerModal, ManualTextBox },
};
</script>
