import api from "src/configs/api";

const getProfile = async () =>
  await api.get("/user/whoami").then((res) => res || false);

const getMyPost = async () => await api.get("/post/my");

const getAllPost = async () => await api.get("");

const getPost = async (id) => await api.get(`/post/${id}`);

export { getProfile, getMyPost, getAllPost, getPost };
