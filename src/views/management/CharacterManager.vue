<template>
  <div>
    <div class="flex">
      <Subtitle>캐릭터 관리</Subtitle>
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition-all"
        leave-to-class="opacity-0"
        leave-active-class="transition-all"
      >
        <div v-show="selectList.length" class="w-full flex justify-end">
          <button
            class="bg-red-500 text-white rounded-md h-10 px-10"
            @click="onDeleteCharacterModal = true"
          >
            삭제하기
          </button>
        </div>
      </Transition>
    </div>

    <ContentTable>
      <template v-slot:head>
        <tr class="h-10 truncate text-left">
          <th class="w-[5%]" @click="onClickAllcheck">
            <div
              class="border-2 rounded-sm w-5 h-5 mx-auto flex justify-center items-center"
              :class="isAllChecked() ? 'bg-blue-400 border-blue-400' : ''"
            >
              <Transition
                enter-from-class="opacity-0"
                enter-active-class="transition-all"
              >
                <CheckIcon v-show="isAllChecked()" class="h-5 w-5 text-white" />
              </Transition>
            </div>
          </th>
          <th class="pl-4 w-[10%]">ID</th>
          <th class="px-4 w-[20%]">이름</th>
          <th class="px-4 w-[20%]">현재 득표수</th>
          <th class="px-4 w-[20%]">생성 날짜</th>
          <th class="px-4 w-[20%]">수정 날짜</th>
        </tr>
      </template>
      <template v-slot:body>
        <tr
          class="h-8 truncate cursor-pointer hover:bg-gray-300"
          v-for="item in characters"
          :key="item"
          @click="$router.push(`/_admin/character/${item.id}`)"
        >
          <td class="px-4 relative" @click.stop="onClickChecked(item.id)">
            <div
              class="border-2 rounded-sm w-5 h-5 mx-auto flex justify-center items-center"
              :class="isChecked(item.id) ? 'bg-blue-400 border-blue-400' : ''"
            >
              <Transition
                enter-from-class="opacity-0"
                enter-active-class="transition-all"
              >
                <CheckIcon
                  v-show="isChecked(item.id)"
                  class="h-5 w-5 text-white"
                />
              </Transition>
            </div>
          </td>
          <td class="px-4">{{ item.id }}</td>
          <td class="px-4">{{ item.name }}</td>
          <td class="px-4">{{ item.vote_count }}</td>

          <td class="px-4">{{ dateFormat(item.created_at) }}</td>
          <td class="px-4">{{ dateFormat(item.updated_at) }}</td>
        </tr>
      </template>
    </ContentTable>

    <ManagerModal
      :onModal="onDeleteCharacterModal"
      :onButton="true"
      @close="onDeleteCharacterModal = false"
      @submit="onClickDeleteCharacter"
    >
      <div
        class="h-32 flex justify-center items-center text-center text-red-500"
      >
        선택된 캐릭터를 삭제하시겠습니까? <br />
        <br />
        삭제된 캐릭터는 복구 할수 없습니다.<br />
      </div>
    </ManagerModal>
    <ManagerModal :onModal="deleteSuccess">
      <div class="flex justify-center items-center h-20 text-xl">
        캐릭터가 삭제되었습니다.
      </div>
    </ManagerModal>
  </div>
</template>

<script>
import ContentTable from "../../components/ContentTable.vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import Subtitle from "../../components/Subtitle.vue";
import ManagerModal from "../../components/ManagerModal.vue";
import dayjs from "dayjs";
import { Auth, Character } from "../../service/Repository";

export default {
  data() {
    return {
      nav: [{ name: "전체 영화 리스트", href: "/movie?page=1" }],
      characters: [],
      pageCount: null,
      selectList: [],
      onDeleteCharacterModal: false,
      deleteSuccess: false,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const page = this.$route.query.page;
      const character = await Character.GetAllCharacter(page);
      this.characters = character.data;
    },

    dateFormat(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },

    isChecked(id) {
      return this.selectList.some((e) => e === id);
    },

    onClickChecked(id) {
      if (this.selectList.some((e) => e === id)) {
        this.selectList = this.selectList.filter((e) => e !== id);
      } else {
        this.selectList.push(id);
      }
    },

    async onClickDeleteCharacter() {
      this.onDeleteCharacterModal = false;

      for (const id of this.selectList) {
        await Character.DeleteCharacter(id);
      }

      this.deleteSuccess = true;
      this.selectList = [];

      setTimeout(() => {
        this.deleteSuccess = false;
        this.fetch();
      }, 2000);
    },

    isAllChecked() {
      return (
        this.selectList.length !== 0 &&
        this.selectList.length === this.characters.length
      );
    },

    onClickAllcheck() {
      if (this.selectList.length) {
        this.selectList = [];
      } else {
        this.selectList = this.characters.map((e) => {
          return e.id;
        });
      }
    },
  },
  components: { ContentTable, Subtitle, dayjs, CheckIcon, ManagerModal },
};
</script>
