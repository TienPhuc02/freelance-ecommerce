import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  FormProps,
  InputNumber,
  InputNumberProps,
  Rate,
} from "antd";
import { useEffect, useState } from "react";
interface FieldType {
  valueQuantity: number;
}
const InforDetailProduct = ({ productDetail }: { productDetail: any }) => {
  const [rate, setRate] = useState<number | undefined>(undefined);
  const [valueQuantity, setValueQuantity] = useState(1);
  const [form] = Form.useForm();
  const onChange: InputNumberProps["onChange"] = (value: any) => {
    setValueQuantity(value);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const IncreaseInput = () => {
    if (valueQuantity < productDetail.stock) {
      const newValue = valueQuantity + 1;
      setValueQuantity(newValue);
      form.setFieldsValue({ valueQuantity: newValue });
    }
  };

  const DecreaseInput = () => {
    if (valueQuantity > 1) {
      const newValue = valueQuantity - 1;
      setValueQuantity(newValue);
      form.setFieldsValue({ valueQuantity: newValue });
    }
  };
  useEffect(() => {
    if (productDetail && typeof productDetail.ratings === "number") {
      setRate(Math.round(productDetail.ratings));
    }
  }, [productDetail]);
  console.log(valueQuantity);
  return (
    <div className="max-w-[700px]">
      <div className="product-name text-[30px] mb-[10px]">
        {productDetail?.name}
      </div>
      <div className="product-id">Product #{productDetail?._id}</div>
      <Divider className="my-2" />
      {rate !== undefined && <Rate disabled defaultValue={rate} />}
      <Divider className="my-2" />
      <div className="text-[30px] font-semibold">${productDetail?.price}</div>
      <div className="form-select-quantity flex gap-2 ">
        <Form
          name="form-quantity"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          className="form-select-quantity flex gap-2 mt-5"
        >
          <Button
            onClick={DecreaseInput}
            className="flex items-center justify-center"
          >
            <MinusOutlined />
          </Button>
          <Form.Item name={"valueQuantity"}>
            <InputNumber
              min={1}
              max={productDetail.stock}
              value={valueQuantity}
              defaultValue={1}
              onChange={onChange}
            />
          </Form.Item>
          <Button
            onClick={IncreaseInput}
            className="flex items-center justify-center"
          >
            <PlusOutlined />
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#167fff] px-7"
          >
            Add to cart
          </Button>
        </Form>
      </div>
      <Divider className="my-2" />
    </div>
  );
};

export default InforDetailProduct;
