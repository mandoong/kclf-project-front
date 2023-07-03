<template>
  <div>
    <Subtitle>문서 관리</Subtitle>

    <div class="bg-white w-full h-[80vh] p-10 text-xl flex flex-col">
      <div class="flex h-20 items-center">
        <div class="w-40">메인 타이틀</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          v-model="title"
        />
        <!-- {{ service.title }}</div> -->
      </div>

      <div class="flex h-20 items-center">
        <div class="w-40">서브 타이블</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          v-model="subtitle"
        />
      </div>

      <div class="flex h-20 items-center">
        <div class="w-40">개최년도</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          v-model="year"
        />
      </div>

      <div class="flex h-20 items-center">
        <div class="w-40">로그인 아이디</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          v-model="login_id"
        />
      </div>

      <div class="flex h-20 items-center">
        <div class="w-40">패스워드 변경</div>
        <button
          class="bg-blue-500 text-white rounded-md h-10 px-4"
          @click="changePassword"
        >
          패스워드 변경
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import { Service } from "../../service/Repository";
export default {
  data() {
    return {
      service: { Type: Object },
      title: null,
      subtitle: null,
      year: null,
      login_id: null,
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const service = await Service.GetDocumentSetting();
      if (service.status === 200) {
        this.title = service.data.title;
        this.subtitle = service.data.subtitle;
        this.year = service.data.year;
        this.login_id = service.data.login_id;
      }
    },
  },
  components: { Subtitle },
};
</script>
