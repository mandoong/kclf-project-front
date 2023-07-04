import { API } from "./API";

export const Character = {
  GetAllCharacter: async (page) => {
    return API.get(`/character/page?page=${page}`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetCharacterById: async (id) => {
    return API.get(`/character/get/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Service = {
  GetDocumentSetting: async () => {
    return API.get(`/document`)
      .then((res) => res)
      .catch((err) => err);
  },

  loginManagementService: async () => {
    return API.get(`/auth/sign-in`)
      .then((res) => res)
      .catch((err) => err);
  },
};
