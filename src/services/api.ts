import axios from "../configs/customize.api";
import { IDataCreateOrder } from "../pages/CheckOut/CheckOut";
export const APIGetAllProduct = (queryParam: string = "") => {
  return axios.get(`products?${queryParam}`);
};
export const APIGetDetailProduct = (id: string | undefined) => {
  return axios.get(`products/${id}`);
};
export const APILoginUser = (
  email: string | undefined,
  password: string | undefined
) => {
  return axios.post("login", {
    email: email,
    password: password,
  });
};
export const APIRegister = (name: string, email: string, password: string) => {
  return axios.post("register", {
    name: name,
    email: email,
    password: password,
  });
};
export const APIAccount = () => {
  return axios.get("refresh");
};
export const APIUpdateProfile = (name?: string, email?: string) => {
  return axios.put("me/update", { name: name, email: email });
};
export const APIUpdatePassword = (
  oldPassword?: string,
  newPassword?: string
) => {
  return axios.put("password/update", {
    oldPassword: oldPassword,
    password: newPassword,
  });
};
export const APIUploadAvatar = (urlImage: string) => {
  const formData = new FormData();
  formData.append("avatar", urlImage);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return axios.put("me/upload_avatar", formData, config);
};
export const APISignOut = () => {
  return axios.get("/logout");
};

export const APIGetAllUsers = () => {
  return axios.get("/admin/users");
};

export const APIGetUserById = (id: string) => {
  return axios.get(`/admin/users/${id}`);
};
export const APIDeleteUserById = (id: string) => {
  return axios.delete(`/admin/users/${id}`);
};
export const APIUpdateUserById = (
  id: string,
  name: string,
  email: string,
  role: string
) => {
  return axios.put(`/admin/users/${id}`, {
    name: name,
    email: email,
    role: role,
  });
};
export const APICreateOrderCOD = (dataOrder: IDataCreateOrder) => {
  return axios.post("/orders/new", dataOrder);
};
