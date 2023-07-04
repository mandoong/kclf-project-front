<template>
  <div>
    <Subtitle>캐릭터 관리</Subtitle>
    <ContentTable>
      <template v-slot:head>
        <tr class="h-10 truncate text-left">
          <th class="pl-4 w-[10%]">ID</th>
          <th class="px-4 w-[20%]">이름</th>
          <th class="px-4 w-[20%]">생성날짜</th>
          <th class="px-4 w-[20%]">업데이트 날짜</th>
        </tr>
      </template>
      <template v-slot:body>
        <tr
          class="h-8 truncate"
          v-for="item in characters"
          :key="item"
          @click="$router.push(`/_admin/character/${item.id}`)"
        >
          <td class="px-4">{{ item.id }}</td>
          <td class="px-4">{{ item.name }}</td>

          <td class="px-4">{{ new Date(item.created_at).toLocaleString() }}</td>
          <td class="px-4">{{ new Date(item.updated_at).toLocaleString() }}</td>
        </tr>
      </template>
    </ContentTable>
  </div>
</template>

<script>
import ContentTable from "../../components/ContentTable.vue";
import Subtitle from "../../components/Subtitle.vue";
import { Character } from "../../service/Repository";

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
  },
  components: { ContentTable, Subtitle },
};
</script>
