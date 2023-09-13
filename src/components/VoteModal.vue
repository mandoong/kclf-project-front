<template>
  <main
    class="w-full h-screen bg-black/60 flex justify-center items-center absolute top-0 z-30"
    @click="$emit('close')"
  >
    <div
      class="w-[45vh] bg-[#FFE266] flex items-center flex-col rounded-[3vh]"
      :class="
        currentMadal === 'vote' || currentMadal === 'complete'
          ? 'aspect-[84/51]'
          : 'aspect-[84/81]'
      "
      @click.stop
    >
      <!-- 투표 확인 -->
      <div
        v-if="currentMadal === 'vote'"
        class="font-tmon text-center py-[4vh] w-full h-full flex items-center flex-col text-[2.8vh] gap-[20%]"
      >
        <Transition
          appear
          enter-from-class="opacity-0 translate-y-10"
          enter-active-class="transition-all duration-500"
        >
          <div>
            {{ count }}개의 캐릭터를 선택하셨습니다.<br />
            이대로 투표하시겠습니까?
          </div>
        </Transition>
        <Transition
          appear
          enter-from-class="opacity-0 translate-y-10"
          enter-active-class="transition-all duration-500"
        >
          <div class="flex text-[3vh] w-full justify-center gap-[10%] delay-75">
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[2vh]"
              @click="onClickVote()"
            >
              예
            </div>
            <div
              class="flex items-center justify-center w-[28%] aspect-[23/14] bg-white rounded-[2vh]"
              @click="$emit('close')"
            >
              아니오
            </div>
          </div>
        </Transition>
      </div>

      <!-- 문자인증 -->
      <div
        class="h-full w-full"
        v-if="currentMadal === 'auth' || currentMadal === 'verification'"
      >
        <div
          class="flex flex-col items-center justify-between h-full w-full px-[5vh] py-[3vh] font-tmon"
        >
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <div class="text-[2.8vh]">투표 인증</div>
          </Transition>
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <div class="text-[2vh]">
              <div>중복 투표를 방지하기 위해</div>
              <div>인증 후 투표가 진행됩니다.</div>
            </div>
          </Transition>
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <div class="w-full" v-if="currentMadal === 'auth'">
              <div class="flex flex-col gap-[1vh] w-full font-neo font-bold">
                <input
                  class="px-2 h-[4.2vh] px-[1.5vh] w-full text-[2vh] border border-[#707070]"
                  placeholder="이름"
                  v-model="name"
                  @input="massage = ''"
                />
                <input
                  class="px-2 h-[4.2vh] px-[1.5vh] w-full text-[2vh] border border-[#707070]"
                  placeholder="전화번호"
                  v-model="phoneNum"
                  @input="massage = ''"
                />
              </div>
            </div>
          </Transition>
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <div class="w-full" v-if="currentMadal === 'verification'">
              <div class="flex flex-col gap-[1vh] w-full font-neo font-bold">
                <input
                  class="px-2 h-[4.2vh] px-[1.5vh] w-full text-[2vh] border border-[#707070]"
                  placeholder="인증번호"
                  v-model="authCode"
                />
              </div>
            </div>
          </Transition>
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <div class="flex w-full text-[1.3vh] font-neo font-bold">
              <button
                class="h-full aspect-[1/1] border border-[#707070]"
                :class="isChecked ? 'bg-blue-500' : 'bg-white'"
                @click="isChecked = !isChecked"
              >
                <CheckIcon class="text-white"></CheckIcon>
              </button>
              <div class="ml-[30px]">[필수] 개인정보활용에 동의합니다.</div>
              <button class="ml-[30px] text-[#EC3F3F]">자세히 보기</button>
            </div>
          </Transition>
          <Transition
            appear
            enter-from-class="opacity-0 translate-y-10"
            enter-active-class="transition-all duration-500"
          >
            <button
              class="w-full h-[4.2vh] text-white text-[2vh] flex justify-center items-center rounded-full"
              :class="isChecked ? 'bg-[#EC3F3F]' : 'bg-gray-500'"
              @click="
                currentMadal === 'auth' ? onClickSend() : onClickValidation()
              "
              @input="massage = ''"
            >
              인증하기
            </button>
          </Transition>

          <div class="text-red-500 font-neo font-bold h-[1vh] text-[1.3vh]">
            {{ massage }}
          </div>

          <div class="text-[1.3vh] font-neo font-bold">
            개인정보는 투표 종료 후 안전하게 삭제됩니다.
          </div>
        </div>
      </div>

      <!-- 투표완료 -->
      <Transition
        appear
        enter-from-class="opacity-0 translate-y-10"
        enter-active-class="transition-all duration-500"
      >
        <div
          v-if="currentMadal === 'complete'"
          class="font-tmon text-center py-[4vh] w-full h-full flex items-center ju flex-col text-[3vh] gap-[20%]"
        >
          <div>
            투표가 완료되었습니다.<br />
            감사합니다.
          </div>
          <div
            class="flex text-[3.5vh] items-center justify-center w-[40%] aspect-[23/14] bg-white rounded-[2vh]"
            @click="$router.push('/')"
          >
            처음으로
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<script>
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import RightArrow from "../assets/icon/RightArrow.vue";
import LeftArrow from "../assets/icon/LeftArrow.vue";
import { Character } from "../service/Repository";

export default {
  props: {
    count: { type: Number },
    selectCharacters: {
      type: Array,
    },
  },
  data() {
    return {
      imagesPage: 0,
      isChecked: false,
      currentMadal: "vote",
      name: null,
      phoneNum: null,
      validation: false,
      massage: "",
      authCode: "",
      token: null,
    };
  },

  methods: {
    upPage() {
      if (this.imagesPage < this.character.images.length - 1) {
        this.imagesPage = this.imagesPage + 1;
      }
    },

    downPage() {
      if (this.imagesPage > 0) {
        this.imagesPage = this.imagesPage - 1;
        this.isImage = this.character.images[this.imagesPage].image;
      }
    },

    onClickVote() {
      this.currentMadal = "auth";
    },

    async onClickSend() {
      if (!this.isChecked) {
        return;
      }

      if (this.phoneNum?.length < 10 || !this.name) {
        this.massage = "이름과 전화번호를 확인해주세요.";
        this.validation = true;
        return;
      }

      const data = { name: this.name, num: this.phoneNum };
      const result = await Character.sendAuthUser(data);

      console.log(result.status);

      if (result.status === 201) {
        this.currentMadal = "verification";
        this.token = result.data.token;
      } else {
        this.massage = "이미 투표에 참여한 전화번호입니다.";
      }
    },

    async onClickValidation() {
      const characters = this.selectCharacters.map((e) => e.id);

      console.log(characters);
      const data = {
        token: this.token,
        authCode: this.authCode,
        character: characters,
      };

      const result = await Character.validationToken(data);

      if (result.status === 201) {
        this.currentMadal = "complete";
      } else {
        this.massage = "인증코드를 다시 확인해주세요.";
      }
    },
  },
  components: {
    XMarkIcon,
    LeftArrow,
    RightArrow,
    CheckIcon,
  },
};
</script>

<style scoped>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

.font-neo {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
</style>
