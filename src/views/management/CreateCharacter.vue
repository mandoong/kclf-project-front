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
          v-if="fileList.length > 0"
          class="border-2 border-gray-200 w-full rounded-lg mt-10 p-4"
        >
          <div class="mb-1" v-for="file in fileList" :key="file">
            {{ file.name }}
          </div>
        </div>
        <div
          v-if="fileList.length > 0"
          class="border-2 border-gray-200 w-full rounded-lg grid grid-cols-5 gap-2 mt-10 p-2"
        >
          <div
            class="border-4 rounded-lg aspect-square"
            v-for="url in previewUrls"
            :key="url"
          >
            <img
              class="w-full h-full object-contain object-center"
              :src="url"
              alt="미리 보기 이미지"
            />
          </div>
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
export default {
  data() {
    return {
      characterName: "",
      fileList: [],
      previewUrls: [],
    };
  },
  methods: {
    onChangeInputFile(e) {
      const files = e.target.files;
      console.log(files);
      this.fileList = files;

      this.previewUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target.result;
          this.previewUrls.push(url);
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

    onClickRegisterCharacter() {},
  },
  components: { Subtitle },
};
</script>
