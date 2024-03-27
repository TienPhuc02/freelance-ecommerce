import axios from "../configs/customize.api";
export const APIGetAllProduct = (currentPage?: number, pageSize?: number) => {
  return axios.get(`products?currentPage=${currentPage}&pageSize=${pageSize}`);
};
