import { useParams, useSearchParams } from "react-router-dom";
import { APIGetAllProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { Checkbox, GetProp, message } from "antd";

import FilterComponent from "../../Components/MainQueryProducts/component.filter-product";
import ProductFiltered from "../../Components/MainQueryProducts/component.product-filtered";

const MainFilterProduct = () => {
  const [allProductFilter, setAllProductFilter] = useState([]);
  const [arrayCategory, setArrayCategory] = useState<string[]>([]);
  const storedCategories = localStorage.getItem("arrayCategory");
  const [qCategory, setQCategory] = useState<string>("");
  const [qRating, setQRating] = useState<string>("");
  const { slug } = useParams<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const getProductFilterKeyWord = async () => {
    if (slug || qCategory !== "" || qRating !== "") {
      const res = await APIGetAllProduct(slug, qCategory, qRating, null, null);
      console.log(res);
      if (res.data && res.data.filteredProductCount !== 0) {
        setAllProductFilter(res.data.products);
        message.success(`Lấy sản phẩm với từ khóa là "${slug?.split("=")[1]}"`);
      } else {
        message.error(
          `Không tìm thấy sản phẩm với từ khóa là "${slug?.split("=")[1]}"`
        );
      }
    }
  };

  const onChangeCheckBoxCategory: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log(checkedValues);
    let qCategory: string = "";
    for (let i = 0; i < checkedValues.length; i++) {
      qCategory += `category=${checkedValues[i]}`;
      console.log(qCategory);
    }
    setSearchParams(qCategory);
    setQCategory(qCategory);
  };
  const onChangeCheckBoxRate: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    let qRating: string = "";
    for (let i = 0; i < checkedValues.length; i++) {
      qRating = `ratings[gte]=${checkedValues[i]}`;
      console.log(qRating);
    }
    setSearchParams(qRating);
    setQRating(qRating);
    console.log(checkedValues);
  };
  useEffect(() => {
    getProductFilterKeyWord();
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setArrayCategory(parsedCategories);
    }
  }, [slug, qCategory, qRating]);

  console.log(allProductFilter);
  console.log(searchParams);
  return (
    <div className=" pt-5 max-w-[1200px] mx-auto">
      <div className="text-[25px] mb-[20px]">
        {qCategory && qCategory !== ""
          ? `Có ${
              allProductFilter.length
            } sản phẩm được tìm thấy với từ khóa : "${
              slug?.split("=")[1]
            }" và phân loại là ${qCategory?.split("=")[1]}`
          : `Có ${
              allProductFilter.length
            } sản phẩm được tìm thấy với từ khóa : "${slug?.split("=")[1]}"`}
      </div>
      <div className="container-content-filter flex gap-[50px]">
        <FilterComponent
          arrayCategory={arrayCategory}
          onChangeCheckBoxCategory={onChangeCheckBoxCategory}
          onChangeCheckBoxRate={onChangeCheckBoxRate}
        />
        <ProductFiltered allProductFilter={allProductFilter} />
      </div>
    </div>
  );
};

export default MainFilterProduct;
