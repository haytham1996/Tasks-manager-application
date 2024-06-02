import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("/users/"),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
