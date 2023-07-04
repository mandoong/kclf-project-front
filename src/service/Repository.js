import { API } from "./API";

export const Character = {
  GetCharacterByPage: async (page) => {
    return API.get(`/character/page?page=${page}`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetAllCharacter: async () => {
    return API.get(`/character/all`)
      .then((res) => res)
      .catch((err) => err);
  },

  CreateCharacter: async (formData) => {
    return API.post(`/character/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res)
      .catch((err) => err);
  },

  GetCharacterById: async (id) => {
    return API.get(`/character/get/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  DeleteCharacter: async (id) => {
    return API.delete(`/character/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  DeleteCharacterImages: async (id, data) => {
    return API.delete(`/character/${id}/image`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  UploadCharacterImages: async (id, formData) => {
    return API.post(`/character/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res)
      .catch((err) => err);
  },

  VoteCharacter: async (data) => {
    return API.post(`/character/vote`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  GetVoteResultCount: async () => {
    return API.get(`/character/vote/count`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetTopVoteCharacter: async () => {
    return API.get(`/character/vote/top`)
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

  UpdateDocumentSetting: async (data) => {
    return API.post(`/document`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  UploadBackgroundImage: async (formData) => {
    return API.post(`/document/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res)
      .catch((err) => err);
  },
};