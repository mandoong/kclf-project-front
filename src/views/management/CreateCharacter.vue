<template>
  <div>
    <Subtitle :isBack="true">캐릭터 등록</Subtitle>
    <ManualTextBox>
      <div class="font-bold">캐릭터 등록 관리 메뉴입니다.</div>
      캐릭터 등록은 캐릭터 이름과 이미지를 등록 할수 있습니다.<br /><br />
      이미지 업로드 <br />
      <div class="indent-4">
        - 이미지 등록 후 하단에 표시 되는 이미지를 클릭 하시면 대표 이미지를
        바꿀 수 있습니다.
      </div>
      <div class="indent-4">
        - 캐릭터 이미지 파일은 jpg, jpeg, png 형식을 지원하며 파일 용량은 5MB
        이하로 업로드 해주십시오.
      </div>
      <div class="indent-4">
        - 한번에 10개 이하의 이미지 파일만 업로드 해주십시오.
      </div>
    </ManualTextBox>

    <div class="bg-white w-full p-10 text-xl flex flex-col">
      <div class="flex h-16 items-center">
        <div class="w-40">캐릭터 이름</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          type="text"
          v-model="characterName"
          @input="onInputCharacterName"
        />
        <Transition
          appear
          enter-from-class="opacity-0"
          enter-actvie-class="transition-all"
        >
          <div v-show="noName" class="ml-10 text-red-500 duration-100">
            * 캐릭터 이름을 입력해주세요.
          </div>
        </Transition>
      </div>

      <div class="flex h-16 items-center">
        <div class="w-40">캐릭터 이미지</div>
        <input
          class="hidden"
          ref="fileInput"
          multiple
          type="file"
          @change="onChangeInputFile"
        />
        <button
          class="bg-blue-500 text-white rounded-md h-10 px-4"
          @click="openFileInput"
        >
          이미지 선택하기
        </button>
        <Transition
          appear
          enter-from-class="opacity-0"
          enter-actvie-class="transition-all"
        >
          <div v-if="noFile" class="ml-10 text-red-500 duration-100">
            * 이미지가 없습니다.
          </div>
        </Transition>
      </div>
      <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition-all"
        leave-to-class="opacity-0"
        leave-active-class="transition-all"
      >
        <div class="flex-1">
          <div
            class="border-2 border-gray-200 w-full rounded-lg flex flex-wrap gap-2 mt-10 p-2"
          >
            <div
              v-for="file in previewUrls"
              :key="file"
              class="border-4 rounded-lg aspect-square relative h-36"
              :class="
                titleImage.name === file.file.name ? 'border-yellow-400' : ''
              "
              @click="titleImage = file.file"
            >
              <img
                class="w-full h-full object-contain object-center"
                :src="file.url"
                alt="미리 보기 이미지"
              />
              <div
                class="absolute cursor-pointer flex justify-center items-center -top-2 -right-2 w-6 aspect-square bg-gray-300 rounded-full"
                @click.stop="onClickFileDelete(file)"
              >
                <XMarkIcon class="w-5"></XMarkIcon>
              </div>
            </div>
            <div
              class="relative border-4 h-36 rounded-lg aspect-square flex justify-center text-gray-400 items-center hover:border-gray-400 hover:text-gray-500 cursor-pointer"
              @click="openFileInput()"
            >
              <PlusIcon class="w-12" />
            </div>
          </div>

          <div class="ml-4 mt-4 text-base">
            노란색 테두리 이미지가 대표 이지미가 됩니다.<br />이미지를 클릭하여
            대표 이미지를 설정하세요. <br />
          </div>
        </div>
      </Transition>
      <div class="w-full h-20 flex justify-center">
        <button
          class="bg-blue-500 text-white rounded-md h-16 px-10"
          @click="onClickRegisterCharacter"
        >
          캐릭터 등록하기
        </button>
      </div>
    </div>
    <div></div>
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-all"
      leave-to-class="opacity-0"
      leave-active-class="transition-all"
    >
      <ManagerModal :onModal="onModal">
        <div class="flex justify-center items-center h-20 text-xl">
          캐릭터가 완성되습니다.
        </div>
      </ManagerModal>
    </Transition>
    <Transition
      enter-from-class="opacity-0 "
      enter-active-class="transition-all"
      leave-to-class="opacity-0"
      leave-active-class="transition-all"
    >
      <ManagerModal :onModal="onUploadModal">
        <div class="flex justify-center items-center h-20 text-xl">
          이미지 파일 용량이 너무 큽니다.<br />
          5MB 이하의 이미지만 허용가능합니다.
        </div>
      </ManagerModal>
    </Transition>
    <Transition
      enter-from-class="opacity-0 "
      enter-active-class="transition-all"
      leave-to-class="opacity-0"
      leave-active-class="transition-all"
    >
      <ManagerModal :onModal="onDuplicateModal">
        <div class="flex justify-center items-center h-20 text-xl">
          중복된 이미지가 있습니다.<br />
          이미지를 다시 확인해주세요.
        </div>
      </ManagerModal>
    </Transition>

    <ManagerModal :onModal="onManyModal">
      <div class="flex justify-center items-center h-20 text-xl text-center">
        이미지가 너무 많습니다.<br />
        한번에 10개 이하의 이미지만 <br />업로드 해주세요.
      </div>
    </ManagerModal>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import ManagerModal from "../../components/ManagerModal.vue";
import ManualTextBox from "../../components/ManualTextBox.vue";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { Auth, Character } from "../../service/Repository";
export default {
  data() {
    return {
      characterName: "",
      fileList: [],
      previewUrls: [],
      titleImage: null,
      noName: false,
      noFile: false,
      onModal: false,
      onUploadModal: false,
      onDuplicateModal: false,
      onManyModal: false,
    };
  },

  mounted() {},

  methods: {
    onChangeInputFile(e) {
      let files = e.target.files;

      for (const i of files) {
        if (i.size >= 5242880) {
          this.onUploadModal = true;
          setTimeout(() => {
            this.onUploadModal = false;
          }, 2000);
        }

        if (this.fileList.some((e) => e.name === i.name)) {
          this.onDuplicateModal = true;
          return setTimeout(() => {
            this.onDuplicateModal = false;
          }, 2000);
        }
      }

      files = [...files].filter((e) => e.size < 5242880);

      this.fileList = [...this.fileList, ...files];
      this.titleImage = this.fileList[0];

      this.previewUrls = [];

      for (let i = 0; i < this.fileList.length; i++) {
        const file = this.fileList[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target.result;
          this.previewUrls.push({ file, url });
        };

        reader.readAsDataURL(file);
      }
    },

    openFileInput() {
      this.noFile = false;
      this.$refs.fileInput.click();
    },

    onInputCharacterName(e) {
      this.noName = false;
      const name = e.target.value;
      this.characterName = name;
    },

    async onClickRegisterCharacter() {
      if (!this.characterName) {
        return (this.noName = true);
      }

      if (!this.fileList) {
        return (this.noFile = true);
      }

      if (this.fileList.length > 10) {
        this.onManyModal = true;
        return setTimeout(() => {
          this.onManyModal = false;
        }, 2000);
      }

      const formData = new FormData();
      formData.append("file", this.titleImage);
      formData.append("name", this.characterName);

      const character = await Character.CreateCharacter(formData);

      if (character.status === 201) {
        const imageData = new FormData();
        const id = character.data.id;
        for (const file of this.fileList) {
          if (file.name !== this.titleImage.name) {
            imageData.append("files", file);
          }
        }
        const result = await Character.UploadCharacterImages(id, imageData);

        this.onModal = true;

        setTimeout(() => {
          this.$router.push(`/_admin/character/${result.data.id}`);
        }, 2000);
      }
    },

    onClickFileDelete(file) {
      this.fileList = this.fileList.filter((e) => e.name !== file.file.name);

      this.previewUrls = [];

      for (let i = 0; i < this.fileList.length; i++) {
        const file = this.fileList[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target.result;
          this.previewUrls.push({ file, url });
        };

        reader.readAsDataURL(file);
      }
    },
  },
  components: { Subtitle, ManagerModal, PlusIcon, ManualTextBox, XMarkIcon },
};
</script>
