import http from "../http-common";

const getAll = () => {
  return http.get("/blogs");
};

const get = id => {
  return http.get(`/blogs/${id}`);
};

const create = data => {
  return http.post("/blogs", data);
};


export default {
  getAll,
  get,
  create,
};