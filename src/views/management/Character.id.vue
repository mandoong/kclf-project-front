<template>
  <div>
    <Subtitle :isBack="true">캐릭터 상세</Subtitle>
    <ManualTextBox>
      <div class="font-bold">캐릭터 관리 메뉴입니다.</div>
      캐릭터 이미지를 추가 하고 대표 이미지를 변경 할 수 있습니다.<br /><br />
      캐릭터 이미지 <br />
      <div class="indent-4">
        - 캐릭터 이미지를 클릭 하면 대표 이미지를 바꿀 수 있습니다.
      </div>
      <div class="indent-4">
        - 캐릭터 이미지를 드래그 하려 순서를 변경할 수 있습니다.
      </div>
      <div class="indent-4">
        - 캐릭터 이미지 파일은 jpg, jpeg, png 형식을 지원하며 원활한 서비스
        이용을 위해 파일 용량은 5MB 이하로 업로드 해주십시오.
      </div>
      <br />
      캐릭터 삭제<br />
      <div class="indent-4">
        - 캐릭터 삭제 시 복구 불가 하오니 유의하여 삭제 해주십시오.
      </div>
    </ManualTextBox>

    <div class="bg-white w-full p-10 text-lg flex flex-col">
      <div class="flex h-10 items-center">
        <div class="w-48">캐릭터 이름</div>
        <input
          class="border-gray-400 w-48 border rounded-lg px-2 h-8"
          v-model="character.name"
        />
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">투표 받은 수</div>
        <div>{{ character.vote_user.length }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">생성 날짜</div>
        <div>{{ dateChange(character.created_at) }}</div>
      </div>

      <div class="flex h-10 items-center">
        <div class="w-48">수정 날짜</div>
        <div>{{ dateChange(character.updated_at) }}</div>
      </div>

      <div class="flex h-10 items-center mt-10">
        <div class="w-48">캐릭터 이미지</div>
      </div>

      <div v-if="character" class="flex-1">
        <div
          class="border-2 border-gray-200 w-full rounded-lg flex flex-wrap p-2 items-center gap-4"
        >
          <draggable
            class="dragArea list-group flex h-36 gap-4 flex-wrap"
            :list="character.images"
            @change="changeImageOrder"
          >
            <div
              class="relative border-4 h-36 rounded-lg aspect-square cursor-pointer"
              :class="
                images.image === character.title_image
                  ? 'border-yellow-400'
                  : ''
              "
              v-for="images in character.images"
              :key="images"
              @click="onClickChangeCharacterTitleImage(images)"
            >
              <img
                class="w-full h-full object-contain object-center"
                :src="images.image"
                alt="미리 보기 이미지"
              />
              <div
                class="absolute cursor-pointer flex justify-center items-center -top-2 -right-2 w-6 aspect-square bg-gray-300 rounded-full"
                @click.stop="onClickSelectImage(images)"
              >
                <XMarkIcon class="w-5"></XMarkIcon>
              </div>
            </div>
          </draggable>
          <div
            draggable="false"
            class="relative border-4 rounded-lg h-36 aspect-square flex justify-center text-gray-400 items-center hover:border-gray-400 hover:text-gray-500 cursor-pointer"
            @click="openFileInput()"
          >
            <PlusIcon class="w-12" />
            <input
              class="hidden"
              ref="fileInput"
              type="file"
              @change="onChangeInputFile"
            />
          </div>
        </div>
      </div>

      <div class="w-full h-20 flex justify-center gap-10 mt-20">
        <button
          class="bg-blue-500 text-white rounded-md h-16 px-10"
          @click="onChangeNameModal = true"
        >
          캐릭터 이름변경
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
    <ManagerModal :onModal="onUploadModal">
      <div class="flex justify-center items-center h-20 text-xl">
        이미지 파일 용량이 너무 큽니다.<br />
        5MB 이하의 이미지만 허용가능합니다.
      </div>
    </ManagerModal>

    <ManagerModal
      :onModal="onChangeNameModal"
      :onButton="true"
      @close="onChangeNameModal = false"
      @submit="onClickChangeCharacterName"
    >
      <div class="h-32 flex justify-center items-center text-center">
        해당 캐릭터이름을 '{{ character.name }}' 으로 <br />
        변경 하시겠습니까?
      </div>
    </ManagerModal>
  </div>
</template>

<script>
import Subtitle from "../../components/Subtitle.vue";
import { defineComponent } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import ManagerModal from "../../components/ManagerModal.vue";
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";
import ManualTextBox from "../../components/ManualTextBox.vue";
import { Character } from "../../service/Repository";
import { VueDraggableNext } from "vue-draggable-next";
import { Auth } from "../../service/Repository";

export default {
  data() {
    return {
      character: { Type: Object },
      onDeleteImageModal: false,
      onTitleModal: false,
      onDeleteCharacterModal: false,
      onChangeNameModal: false,
      isImage: null,
      onUploadModal: false,
      dragging: false,
      enabled: true,
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
    },

    async onChangeInputFile(e) {
      const file = e.target.files[0];

      if (file.size >= 5242880) {
        this.onUploadModal = true;
        setTimeout(() => {
          this.onUploadModal = false;
        }, 2000);
      }

      const id = this.character.id;
      const imageData = new FormData();

      imageData.append("files", file);

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

    async changeImageOrder() {
      const ids = this.character.images.map((e) => {
        return e.id;
      });

      const id = this.character.id;
      await Character.changeCharacterImageOrder(id, ids);

      this.fetch();
    },

    dateChange(date) {
      return dayjs(date).format("YYYY-MM-DD  HH:mm");
    },

    async onClickChangeCharacterName() {
      await Character.ChangeCharacterName(
        this.character.id,
        this.character.name
      );

      this.onChangeNameModal = false;
      this.fetch();
    },
  },
  components: {
    Subtitle,
    XMarkIcon,
    ManagerModal,
    PlusIcon,
    ManualTextBox,
    draggable: VueDraggableNext,
  },
};
</script>
