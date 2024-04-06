import { useParams } from "react-router-dom";
import { APIGetAllProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { Checkbox, Form, FormProps, GetProp, message } from "antd";
import FilterComponent from "../../Components/MainQueryProducts/component.filter-product";
import ProductFiltered from "../../Components/MainQueryProducts/component.product-filtered";
type FieldType = {
  pricegt?: string;
  pricelt?: string;
};
const MainFilterProduct = () => {
  const [form] = Form.useForm();
  const [allProductFilter, setAllProductFilter] = useState([]);
  const [arrayCategory, setArrayCategory] = useState<string[]>([]);
  const storedCategories = localStorage.getItem("arrayCategory");
  const [qCategory, setQCategory] = useState<string>("");
  const [qRating, setQRating] = useState<string>("");
  const [qPrice, setQPrice] = useState<string>("");
  const { slug } = useParams<string>();
  const getProductFilter = async () => {
    let queryParams = "";
    try {
      if (slug) {
        queryParams += `keyword=${slug.split("=")[1]}&`;
      }
      if (qCategory) {
        queryParams += `${qCategory}&`;
      }
      if (qRating) {
        queryParams += `${qRating}&`;
      }
      if (qPrice) {
        queryParams += `${qPrice}&`;
      }

      // Kiểm tra xem có tham số nào được truyền vào không
      if (queryParams !== "") {
        // Loại bỏ dấu & cuối cùng
        if (queryParams.endsWith("&")) {
          queryParams = queryParams.slice(0, -1);
        }
        console.log(queryParams);
        const res = await APIGetAllProduct(queryParams);
        if (res && res.data) {
          setAllProductFilter(res.data.products);
          message.success(
            `Lấy sản phẩm với từ khóa là "${slug?.split("=")[1]}"`
          );
        } else {
          message.error(
            `Không tìm thấy sản phẩm với từ khóa là "${slug?.split("=")[1]}"`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Đã xảy ra lỗi khi lấy sản phẩm");
    }
  };

  const onChangeCheckBoxCategory: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    let qCategory: string = "";
    for (let i = 0; i < checkedValues.length; i++) {
      qCategory += `category=${checkedValues[i]}`;
    }
    // setSearchParams(qCategory);
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
    setQRating(qRating);
  };
  const onFinishFilterPrice: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    let queryPrice = "";
    queryPrice = `price[gt]=${values.pricegt}&price[lt]=${values.pricelt}`;
    setQPrice(queryPrice);
  };
  const onFinishFailedFilterPrice = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeInputGTPrice = (value: number | null) => {
    console.log("changed", value);
  };
  const onChangeInputLTPrice = (value: number | null) => {
    console.log("changed", value);
  };
  useEffect(() => {
    getProductFilter();
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setArrayCategory(parsedCategories);
    }
  }, [qCategory, qRating, qPrice]);

  console.log(allProductFilter);
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
          onChangeInputGTPrice={onChangeInputGTPrice}
          onChangeInputLTPrice={onChangeInputLTPrice}
          onFinishFilterPrice={onFinishFilterPrice}
          formPrice={form}
          onFinishFailedFilterPrice={onFinishFailedFilterPrice}
        />
        <ProductFiltered allProductFilter={allProductFilter} />
      </div>
    </div>
  );
};

export default MainFilterProduct;
