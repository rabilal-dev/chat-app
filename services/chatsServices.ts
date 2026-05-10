import api from "./api";

export const getChatList = async () => {
  const response = await api.get("/conversations");
  const { data } = response.data;
  return { chats: data };
};

export const getAvalableChats = async (q: string) => {
  const response = await api.get("/users/search", { params: { q } });
  const { data } = response.data;
  return { chats: data };
};
