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
