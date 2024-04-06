import { Button, Divider, Form, FormProps, InputNumber, Rate } from "antd";
import { Checkbox, Col, Row } from "antd";
import type { GetProp } from "antd";
type FieldType = {
  pricegt?: string;
  pricelt?: string;
};
type PropsType = {
  arrayCategory: string[];
  onChangeCheckBoxCategory: GetProp<any, "onChange">;
  onChangeCheckBoxRate: GetProp<any, "onChange">;
};
const FilterComponent = ({
  arrayCategory,
  onChangeCheckBoxCategory,
  onChangeCheckBoxRate,
}: PropsType) => {
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
  const arrayRating = [5, 4, 3, 2, 1];
  return (
    <div className="filter-left-content w-[300px] p-2 ">
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
          onChange={onChangeCheckBoxCategory}
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
          onChange={onChangeCheckBoxRate}
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
  );
};

export default FilterComponent;
