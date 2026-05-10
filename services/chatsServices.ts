import api from "./api";

export const getChatList = async () => {
  const response = await api.get("/conversations");
  const { data } = response.data;
  return { chats: data };
};
