import api from "src/configs/api";

const addCategory = (category) => {
  return api.post("/category", category);
};

const getCategory = () => {
  return api.get("/category");
};

const deleteCategory = (id) => {
  return api.delete(`/category/${id}`);
};

export { addCategory, getCategory, deleteCategory };
