import { useParams } from "react-router-dom";
import { APIGetAllProduct } from "../../services/api";
import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  FormProps,
  InputNumber,
  message,
  Rate,
} from "antd";
import { Checkbox, Col, Row } from "antd";
import type { GetProp } from "antd";
type FieldType = {
  pricegt?: string;
  pricelt?: string;
};
const MainFilterProduct = () => {
  const [allProductFilter, setAllProductFilter] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const storedCategories = localStorage.getItem("arrayCategory");
  if (storedCategories) {
    const parsedCategories = JSON.parse(storedCategories);
    console.log(parsedCategories);
  }
  const { slug } = useParams<string>();
  console.log(slug);

  const getProductFilterKeyWord = async () => {
    if (slug) {
      const res = await APIGetAllProduct(slug);
      console.log(res);
      if (res.data && res.data.filteredProductCount !== 0) {
        setAllProductFilter(res.data.products);
        message.success(`Lấy sản phẩm với từ khóa là "${slug.split("=")[1]}"`);
      } else {
        message.error(
          `Không tìm thấy sản phẩm với từ khóa là "${slug.split("=")[1]}"`
        );
      }
    }
  };

  useEffect(() => {
    getProductFilterKeyWord();
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setArrayCategory(parsedCategories);
    }
  }, [slug]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeInputLeft = (value: number | null) => {
    console.log("changed", value);
  };
  const onChangeInputRight = (value: number | null) => {
    console.log("changed", value);
  };
  const onChangeCheckBox: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };
  console.log(arrayCategory);
  const arrayRating = [5, 4, 3, 2, 1];
  return (
    <div className="min-h-[screen] pt-5 max-w-[1200px] mx-auto">
      <div className="text-[25px] mb-[20px]">
        Có {allProductFilter.length} sản phẩm được tìm thấy với từ khóa : "
        {slug?.split("=")[1]}"
      </div>
      <div className="container-content-filter flex gap-[50px] h-[550px]">
        <div className="filter-left-content w-[300px] p-2">
          <p className="text-[20px]">Tìm kiếm </p>
          <Divider className="my-2" />
          <div className="filter-price">
            <p className="mb-3">Lọc theo giá</p>
            <Form
              className="form-filter-price w-full"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="flex gap-3 ">
                <Form.Item<FieldType> name="pricegt">
                  <InputNumber
                    min={0}
                    max={1000}
                    placeholder="Giá trị tối thiểu"
                    onChange={onChangeInputLeft}
                    className="w-[130px]"
                  />
                </Form.Item>
                <Form.Item<FieldType> name="pricelt">
                  <InputNumber
                    min={1}
                    className="w-[130px]"
                    max={1000}
                    placeholder="Giá trị tối đa"
                    width={140}
                    onChange={onChangeInputRight}
                  />
                </Form.Item>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#167fff]"
              >
                Lọc sản phẩm theo giá
              </Button>
            </Form>
          </div>
          <Divider className="my-3" />
          <p className="mb-[5px]">Phân loại</p>
          <div className="checkbox-filter">
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={onChangeCheckBox}
            >
              <div>
                {arrayCategory &&
                  arrayCategory.length !== 0 &&
                  arrayCategory.map((category: any) => (
                    <Row key={category} className="mb-[10px]">
                      <Col span={24}>
                        <Checkbox value={`${category}`}>{category}</Checkbox>
                      </Col>
                    </Row>
                  ))}
              </div>
            </Checkbox.Group>
          </div>
          <Divider className="my-3" />
          <p className="mb-[5px]">Xếp hạng</p>
          <div className="checkbox-filter">
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={onChangeCheckBox}
            >
              <div>
                {arrayRating &&
                  arrayRating.length !== 0 &&
                  arrayRating.map((rating: any) => (
                    <Row key={rating} className="mb-[10px]">
                      <Col span={24}>
                        <Checkbox value={rating}>
                          <Rate disabled defaultValue={rating} />
                        </Checkbox>
                      </Col>
                    </Row>
                  ))}
              </div>
            </Checkbox.Group>
          </div>
        </div>
        <div className="product-filtered w-[800px] border border-green-500"></div>
      </div>
    </div>
  );
};

export default MainFilterProduct;
