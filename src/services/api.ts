import axios from "../configs/customize.api";
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
  return axios.put("newPassword", {
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
