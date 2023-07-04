<template>
  <div>
    <Subtitle :isBack="true">캐릭터 등록</Subtitle>

    <div class="bg-white w-full h-[80vh] p-10 text-xl flex flex-col">
      <div class="flex h-16 items-center">
        <div class="w-40">캐릭터 이름</div>
        <input
          class="border-gray-400 border rounded-lg px-2 h-10"
          type="text"
          v-model="characterName"
          @input="onInputCharacterName"
        />
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
      </div>

      <div class="flex-1">
        <div
          v-if="fileList.length"
          class="border-2 border-gray-200 w-full rounded-lg grid grid-cols-5 gap-2 mt-10 p-2"
        >
          <div
            class="border-4 rounded-lg aspect-square"
            :class="
              titleImage.name === file.file.name ? 'border-yellow-400' : ''
            "
            @click="titleImage = file.file"
            v-for="file in previewUrls"
            :key="file"
          >
            <img
              class="w-full h-full object-contain object-center"
              :src="file.url"
              alt="미리 보기 이미지"
            />
          </div>
        </div>
        <div class="ml-4 mt-4">
          노란색 테두리 이미지가 대표 이지미가 됩니다.<br />이미지를 클릭하여
          대표 이미지를 설정하세요.
        </div>
      </div>
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
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import { Character } from "../../service/Repository";
export default {
  data() {
    return {
      characterName: "",
      fileList: [],
      previewUrls: [],
      titleImage: null,
    };
  },
  methods: {
    onChangeInputFile(e) {
      const files = e.target.files;

      this.fileList = files;
      this.titleImage = files[0];

      this.previewUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target.result;
          this.previewUrls.push({ file, url });
        };

        reader.readAsDataURL(file);
      }
    },

    openFileInput() {
      this.$refs.fileInput.click();
    },

    onInputCharacterName(e) {
      const name = e.target.value;
      this.characterName = name;
    },

    async onClickRegisterCharacter() {
      const formData = new FormData();
      formData.append("file", this.titleImage);
      formData.append("name", this.characterName);

      const character = await Character.CreateCharacter(formData);
      console.log(this.fileList[0]);

      if (character.status === 201) {
        const imageData = new FormData();
        const id = character.data.id;
        for (const file of this.fileList) {
          if (file.name !== this.titleImage.name) {
            imageData.append("files", file);
          }
        }
        await Character.UploadCharacterImages(id, imageData);
      }
    },
  },
  components: { Subtitle },
};
</script>
