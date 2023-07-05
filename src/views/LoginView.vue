<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-100">
    <div
      class="w-2/3 h-2/3 bg-white flex justify-center shadow-2xl overflow-hidden rounded-xl items-center"
    >
      <div class="flex-1 h-full text-white bg-gray-400">
        <div
          class="w-full mt-40 flex px-10 font-bold items-end text-3xl flex-col justify-end"
        >
          <div class="text-5xl">KCLF</div>
          <div>관리자 서비스</div>
        </div>
        <div class="w-full mt-20 text-end text-lg px-4">
          <div>서비스 이용에 문제발생시</div>
          <div>아래 이메일로 문의 바랍니다.</div>
          <div class="mt-4">lj0566@gmail.com</div>
        </div>
        <div></div>
      </div>

      <div class="flex-1 flex px-20 justify-center items-center flex-col">
        <div class="w-full h-20">
          <label for="email" class="block text-xl font-bold text-gray-700"
            >아이디</label
          >
          <div class="relative mt-1">
            <input
              v-model="loginId"
              name="email"
              class="block w-full text-xl rounded-md h-14 px-2 border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="You@Email.com"
            />
          </div>
        </div>

        <div class="w-full h-20 mt-10">
          <label for="email" class="block text-xl font-bold text-gray-700"
            >비밀번호</label
          >
          <div class="mt-1 relative">
            <input
              v-model="loginPW"
              type="password"
              name="email"
              class="block w-full rounded-md h-14 px-2 text-xl"
              :class="
                loginFailed
                  ? 'border border-red-500 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
                  : 'w-full h-10 px-2  border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              "
              placeholder="Password"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
              v-show="loginFailed"
            >
              <ExclamationCircleIcon
                class="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div class="h-6">
          <div class="my-2 text-sm text-red-600">
            <div v-if="loginFailed">{{ failedMassage }}</div>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base mt-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="onClickLogin()"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";
import { Service, Auth } from "../service/Repository";

export default {
  data() {
    return {
      loginFailed: false,
      failedMassage: "비밀번호를 확인해주세요",
      loginId: "",
      loginPW: "",
    };
  },

  methods: {
    async onClickLogin() {
      const pw = this.loginPW;
      const login = await Auth.SignIn(pw);
      if (login.status === 201) {
        const token = login.data;
        window.localStorage.setItem("Token", token.accessToken);
        this.$router.push("/_admin");
      } else {
        this.loginFailed = true;
      }
    },
  },
  components: {
    ExclamationCircleIcon,
  },
};

const count = ref(0);
</script>
