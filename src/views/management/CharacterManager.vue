<template>
  <div>
    <Subtitle>캐릭터 관리</Subtitle>
    <ContentTable>
      <template v-slot:head>
        <tr class="h-10 truncate text-left">
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
          <td class="px-4">{{ item.id }}</td>
          <td class="px-4">{{ item.name }}</td>
          <td class="px-4">{{ item.vote_count }}</td>

          <td class="px-4">{{ dateFormat(item.created_at) }}</td>
          <td class="px-4">{{ dateFormat(item.updated_at) }}</td>
        </tr>
      </template>
    </ContentTable>
  </div>
</template>

<script>
import ContentTable from "../../components/ContentTable.vue";
import Subtitle from "../../components/Subtitle.vue";
import dayjs from "dayjs";
import { Auth, Character } from "../../service/Repository";

export default {
  data() {
    return {
      nav: [{ name: "전체 영화 리스트", href: "/movie?page=1" }],
      characters: [],
      pageCount: null,
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
      return dayjs(date).format("YYYY-MM-DD  HH:MM");
    },
  },
  components: { ContentTable, Subtitle, dayjs },
};
</script>
