import axios from "../configs/customize.api";
export const APIGetAllProduct = (
  queryParam: string = ""
  // queryCategory: string = "",
  // queryRating: string = "",
  // queryPrice: string = ""
  // currentPage?: number | null,
  // pageSize?: number | null
) => {
  return axios.get(`products?${queryParam}`);
};
