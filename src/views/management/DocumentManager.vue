<template>
  <div class="">
    <Subtitle>서비스 관리</Subtitle>
    <ManualTextBox>
      <div class="font-bold">서비스 관리 메뉴입니다.</div>
      해당 메뉴에서 서비스의 내용을 수정 할수 있습니다.<br /><br />
      배경 이미지 <br />
      <div class="indent-4">
        - 메인 배경 이미지는 이벤트 최상위 페이지의 배경을 변경할수 있습니다.
      </div>
      <div class="indent-4">
        - 서브 배경 이미지는 투표, 결과, 순위 페이지 등 최상위 페이지를 제외한
        페이지의 배경을 변경할수 있습니다.
      </div>
      <div class="indent-4">
        - 이미지 파일 크기는 5MB 이하로 업로드 해주십시오
      </div>
      <div class="indent-4">
        - 배경 이미지 업로드 후 파일 선택 시 즉시 적용 됩니다. 이용에 참고
        바랍니다.
      </div>
      <br />

      투표 종료 날짜 <br />
      <div class="indent-4">
        - 투표 종료날짜는 해당 날짜 00시를 기준으로 적용됩니다. 종료 날짜로 부터
        이벤트 페이지는 결과 페이지가 보여지게 됩니다.
      </div>
    </ManualTextBox>

    <div class="bg-white w-full h-[80vh] p-6 flex flex-col justify-between">
      <div class="flex h-12 items-center">
        <div class="w-56">메인 타이틀</div>
        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="title"
        />
        <!-- {{ service.title }}</div> -->
      </div>

      <div class="flex h-12 items-center">
        <div class="w-56">서브 타이틀</div>
        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="subtitle"
        />
      </div>

      <div class="flex h-12 items-center">
        <div class="w-56">개최년도</div>
        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="year"
        />
      </div>

      <div class="flex h-12 items-center">
        <div class="w-56">투표 종료 날짜</div>

        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="voteDate"
          type="date"
        />
      </div>

      <div class="flex h-12 items-center">
        <div class="w-56">로그인 아이디</div>
        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="login_id"
        />
      </div>

      <div class="flex h-16 items-center">
        <div class="w-56">패스워드 변경</div>

        <button
          class="bg-blue-500 text-white rounded-md h-10 px-4"
          @click="onPasswordModal = true"
        >
          패스워드 변경
        </button>
      </div>

      <div class="flex gap-10">
        <div class="">
          <div class="flex h-16 items-center">
            <div class="w-56">메인 배경 이미지</div>
            <input
              class="hidden"
              ref="titleImage"
              type="file"
              @change="onChangeInputFile"
            />
          </div>

          <div class="w-40 border-2 border-gray-200 rounded-lg gap-2 p-2">
            <div class="border-4 w-full rounded-lg aspect-square">
              <img
                class="w-full h-full object-contain object-center"
                :src="titleImageUrl || service.title_background_image"
                alt="미리 보기 이미지"
              />
            </div>
          </div>
          <button
            class="w-40 bg-blue-500 text-white rounded-md h-10 px-4 mt-4"
            @click="openFileInput('titleImage')"
          >
            이미지 업로드
          </button>
        </div>

        <div class="">
          <div class="flex h-16 items-center">
            <div class="w-56">서브 배경 이미지</div>
            <input
              class="hidden"
              ref="subImage"
              type="file"
              @change="onChangeInputFile"
            />
          </div>

          <div class="w-40 border-2 border-gray-200 rounded-lg p-2">
            <div class="border-4 w-full rounded-lg aspect-square">
              <img
                class="w-full h-full object-contain object-center"
                :src="subImageUrl || service.sub_background_image"
                alt="미리 보기 이미지"
              />
            </div>
          </div>
          <button
            class="w-40 bg-blue-500 text-white rounded-md h-10 px-4 mt-4"
            @click="openFileInput('subImage')"
          >
            이미지 업로드
          </button>
        </div>
      </div>
      <div class="mt-4">
        기본 적용된 이미지 크기는 1080 x 1920 입니다.<br />
        업로드 시 참고 바랍니다.
      </div>

      <div class="w-full h-16 flex justify-center mt-10">
        <button
          class="bg-blue-500 text-white rounded-md h-16 px-10"
          @click="onClickModal"
        >
          수정 사항 변경
        </button>
      </div>
    </div>
    <ManagerModal
      :onModal="onModal"
      :onButton="true"
      @close="onModal = false"
      @submit="onClickRegisterDocument"
    >
      <div class="h-20 flex justify-center items-center font-bold text-lg">
        수정 사항을 적용하시겠습니까?
      </div>
    </ManagerModal>

    <ManagerModal
      :onModal="onPasswordModal"
      :onButton="true"
      @close="onPasswordModal = false"
      @submit="onClickChangePassword"
    >
      <div class="flex justify-center items-center flex-col gap-2 p-4">
        <div class="flex gap-4 items-center">
          <div class="w-34">현재 비밀번호</div>
          <input
            class="border-gray-400 border rounded-lg px-2 h-10"
            type="password"
            v-model="PresentPassword"
            @change="(onPasswordErr = false), (changePasswordErr = false)"
          />
        </div>
        <div class="flex gap-4 items-center">
          <div class="w-34">변경 비밀번호</div>
          <input
            class="border-gray-400 border rounded-lg px-2 h-10"
            type="password"
            v-model="changePassword"
            @change="(onPasswordErr = false), (changePasswordErr = false)"
          />
        </div>
        <div
          class="h-6 text-red-500"
          :class="successChange ? 'text-blue-500' : 'text-red-500'"
        >
          {{ onPasswordErr ? "현재 비밀번호를 다시 확인해주십시오." : "" }}
          {{
            changePasswordErr ? "변경 할 비밀번호를 8자 이상 작성해주세요." : ""
          }}
          {{ successChange ? "비밀번호가 변경되었습니다." : "" }}
        </div>

        <div class="h-10 flex justify-center items-center font-bold text-lg">
          패스워드를 변경하시겠습니까?
        </div>
      </div>
    </ManagerModal>
    <ManagerModal :onModal="onUploadqModal">
      <div class="flex justify-center items-center h-20 text-xl">
        이미지 파일 용량이 너무 큽니다.<br />
        5MB 이하의 이미지만 허용가능합니다.
      </div>
    </ManagerModal>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import ManagerModal from "../../components/ManagerModal.vue";
import ManualTextBox from "../../components/ManualTextBox.vue";
import { Service, Auth } from "../../service/Repository";
import dayjs from "dayjs";
export default {
  data() {
    return {
      service: { Type: Object },
      title: null,
      subtitle: null,
      year: null,
      login_id: null,
      onModal: false,
      onPasswordModal: false,
      onPasswordErr: false,
      changePasswordErr: false,
      onUploadqModal: false,
      successChange: false,
      voteDate: null,

      onRef: "",

      titleImage: null,
      subImage: null,
      titleImageUrl: null,
      subImageUrl: null,

      PresentPassword: null,
      changePassword: null,
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const service = await Service.GetDocumentSetting();
      if (service.status === 200) {
        this.service = service.data;
        this.title = service.data.title;
        this.subtitle = service.data.subtitle;
        this.year = service.data.year;
        this.login_id = service.data.login_id;
        this.voteDate = dayjs(service.data.vote_at).format("YYYY-MM-DD");
      }
    },
    onChangeInputFile(e) {
      const file = e.target.files[0];

      if (file.size >= 5242880) {
        this.onUploadqModal = true;
        setTimeout(() => {
          this.onUploadqModal = false;
        }, 2000);

        return "";
      }

      if (this.onRef === "titleImage") {
        this.titleImage = file;
        this.titleImageUrl = null;
      } else if (this.onRef === "subImage") {
        this.subImage = file;
        this.subImageUrl = null;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        if (this.onRef === "titleImage") {
          this.titleImageUrl = url;
        } else if (this.onRef === "subImage") {
          this.subImageUrl = url;
        }
      };

      reader.readAsDataURL(file);
    },

    openFileInput(ref) {
      this.$refs[ref].click();
      this.onRef = ref;
    },

    onClickModal() {
      this.onModal = true;
    },

    async onClickRegisterDocument() {
      if (this.titleImage) {
        const formData = new FormData();
        formData.append("file", this.titleImage);
        formData.append("type", "title");
        await Service.UploadBackgroundImage(formData);
      }

      if (this.subImage) {
        const formData = new FormData();
        formData.append("file", this.subImage);
        formData.append("type", "sub");
        await Service.UploadBackgroundImage(formData);
      }

      const body = {
        title: this.title,
        subtitle: this.subtitle,
        year: this.year,
        login_id: this.login_id,
        vote_at: this.voteDate,
      };

      await Service.UpdateDocumentSetting(body);

      this.onModal = false;
      this.fetch();
    },

    async onClickChangePassword() {
      const user = await Auth.SignIn(this.PresentPassword);

      if (user.status === 201) {
        if (this.changePassword.length >= 8) {
          await Auth.ChangePassword(this.changePassword);
          this.successChange = true;
          setTimeout(() => {
            this.onPasswordModal = false;
            this.PresentPassword = null;
            this.changePassword = null;
            this.successChange = false;
          }, 2000);
        } else {
          this.changePasswordErr = true;
        }
      } else {
        this.onPasswordErr = true;
      }
    },
  },
  components: { Subtitle, ManagerModal, ManualTextBox },
};
</script>
