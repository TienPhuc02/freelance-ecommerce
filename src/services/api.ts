import axios from "../configs/customize.api";
export const APIGetAllProduct = (
  params: string = "",
  query: string = "",
  currentPage?: number | null,
  pageSize?: number | null
) => {
  return axios.get(
    `products?currentPage=${currentPage}&pageSize=${pageSize}&${params}&${query}`
  );
};
