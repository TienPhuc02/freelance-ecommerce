import axios from "../configs/customize.api";
export const APIGetAllProduct = (
  query: string = "",
  currentPage?: number,
  pageSize?: number
) => {
  return axios.get(
    `products?currentPage=${currentPage}&pageSize=${pageSize}&${query}`
  );
};
