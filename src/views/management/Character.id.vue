<template>
  <div>
    <Subtitle :isBack="true">캐릭터 상세</Subtitle>

    <div class="bg-white w-full p-10 text-lg flex flex-col">
      <div class="flex h-10 items-center">
        <div class="w-48">캐릭터 이름</div>
        <div>{{ character.name }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">투표 받은 수</div>
        <div>{{ character.vote_count }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">생성 날짜</div>
        <div>{{ character.created_at }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">수정 날짜</div>
        <div>{{ character.updated_at }}</div>
      </div>

      <div class="flex h-10 items-center mt-10">
        <div class="w-48">캐릭터 이미지</div>
      </div>

      <div class="flex-1">
        <div
          class="border-2 border-gray-200 w-full rounded-lg grid grid-cols-10 gap-2 mt-4 p-2"
        >
          <div
            class="relative border-4 rounded-lg aspect-square"
            :class="
              images.image === character.title_image ? 'border-yellow-400' : ''
            "
            @click="onClickChangeCharacterTitleImage(images)"
            v-for="images in character.images"
            :key="images"
          >
            <img
              class="w-full h-full object-contain object-center"
              :src="images.image"
              alt="미리 보기 이미지"
            />
            <div
              class="absolute flex justify-center items-center -top-2 -right-2 w-5 aspect-square bg-gray-300 rounded-full"
              @click="onClickSelectImage(images)"
            >
              <XMarkIcon class="w-4"></XMarkIcon>
            </div>
          </div>

          <div
            class="relative border-4 rounded-lg aspect-square flex justify-center text-gray-400 items-center hover:border-gray-400 hover:text-gray-500"
            @click="openFileInput()"
          >
            <PlusIcon class="w-12" />
            <input
              class="hidden"
              ref="fileInput"
              multiple
              type="file"
              @change="onChangeInputFile"
            />

            <div
              class="absolute flex justify-center items-center -top-2 -right-2 w-5 aspect-square bg-gray-300 rounded-full"
              @click="onTitleModal = true"
            >
              <XMarkIcon class="w-4"></XMarkIcon>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-20 flex justify-center gap-10 mt-20">
        <button class="bg-blue-500 text-white rounded-md h-16 px-10">
          대표 이미지 변경
        </button>

        <button
          class="bg-red-500 text-white rounded-md h-16 px-10"
          @click="onDeleteCharacterModal = true"
        >
          캐릭터 삭제하기
        </button>
      </div>
    </div>
    <div></div>

    <ManagerModal
      :onModal="onDeleteImageModal"
      :onButton="true"
      @close="onDeleteImageModal = false"
      @submit="onClickDeleteCharacterImages"
    >
      <div class="h-20 flex justify-center items-center">
        정말로 캐릭터 이미지를 삭제하시겠습니까?
      </div>
    </ManagerModal>

    <ManagerModal
      :onModal="onDeleteCharacterModal"
      :onButton="true"
      @close="onDeleteCharacterModal = false"
      @submit="onClickDeleteCharacter"
    >
      <div
        class="h-32 flex justify-center items-center text-center text-red-500"
      >
        정말로 캐릭터를 삭제하시겠습니까? <br />
        <br />
        삭제된 캐릭터는 복구 할수 없습니다.<br />
      </div>
    </ManagerModal>

    <ManagerModal :onModal="onTitleModal" @close="onTitleModal = false">
      <div class="h-32 flex justify-center items-center text-center">
        대표캐릭터는 삭제할수 없습니다.<br />
        대표캐릭터를 변경 한 후 삭제 해주십시오.
      </div>

      <div class="w-full h-12 flex justify-center gap-10 text-white">
        <div
          class="w-20 flex justify-center items-center rounded-lg bg-blue-500"
          @click="onTitleModal = false"
        >
          닫기
        </div>
      </div>
    </ManagerModal>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";

import ManagerModal from "../../components/ManagerModal.vue";
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { Character } from "../../service/Repository";
import { Auth } from "../../service/Repository";
export default {
  data() {
    return {
      character: { Type: Object },
      onDeleteImageModal: false,
      onTitleModal: false,
      onDeleteCharacterModal: false,
      isImage: null,
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const id = this.$route.params.id;
      const character = await Character.GetCharacterById(id);
      if (character.status === 200) {
        this.character = character.data;
      }
    },

    onClickSelectImage(image) {
      if (image.image === this.character.title_image) {
        return (this.onTitleModal = true);
      }

      this.isImage = image;
      this.onDeleteImageModal = true;
      console.log(image.id);
    },

    async onChangeInputFile(e) {
      const files = e.target.files;

      const id = this.character.id;
      const imageData = new FormData();
      for (const file of files) {
        imageData.append("files", file);
      }
      await Character.UploadCharacterImages(id, imageData);

      this.fetch();
    },

    openFileInput() {
      this.$refs.fileInput.click();
    },

    async onClickDeleteCharacterImages() {
      const imageId = this.isImage.id;
      const id = this.character.id;
      await Character.DeleteCharacterImages(id, imageId);

      this.onDeleteImageModal = false;
      this.fetch();
    },

    async onClickDeleteCharacter() {
      const id = this.character.id;
      const result = await Character.DeleteCharacter(id);

      if (result.status === 200) {
        this.$router.push("/_admin/character");
      }
    },

    async onClickChangeCharacterTitleImage(image) {
      const id = this.character.id;
      const imageId = image.id;
      await Character.ChangeCharacterTitleImage(id, imageId);

      this.fetch();
    },
  },
  components: { Subtitle, XMarkIcon, ManagerModal, PlusIcon },
};
</script>
