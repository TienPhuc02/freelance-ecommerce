import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  FormInstance,
  FormProps,
  InputNumber,
  Rate,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface PropInForProduct {
  DecreaseInput: () => void;
  IncreaseInput: () => void;
  valueQuantityNumber: number;
  form: FormInstance<any>;
  onChange: (value: any | null) => void;
  productDetail: any;
  handleAddProduct: any;
}
const InforDetailProduct = ({
  productDetail,
  DecreaseInput,
  IncreaseInput,
  valueQuantityNumber,
  form,
  onChange,
  handleAddProduct,
}: PropInForProduct) => {
  const [rate, setRate] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const onFinish: FormProps<PropInForProduct>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const user = useSelector((state: any) => state.account);
  console.log(user);
  const onFinishFailed: FormProps<PropInForProduct>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (productDetail && typeof productDetail.ratings === "number") {
      setRate(Math.round(productDetail.ratings));
    }
  }, [productDetail]);
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
          <Form.Item name={"valueQuantity"} initialValue={0}>
            <InputNumber
              min={0}
              max={productDetail.stock}
              value={valueQuantityNumber}
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
            onClick={() => handleAddProduct(valueQuantityNumber, productDetail)}
          >
            Add to cart
          </Button>
        </Form>
      </div>
      <Divider className="my-2" />
      <div className="status-stock text-[15px]">
        Status :{" "}
        {productDetail.stock > 0 ? (
          <span className="text-green-400">In Stock</span>
        ) : (
          <span className="text-red-500">Out Of Stock</span>
        )}
      </div>
      <Divider className="my-2" />
      <div className="description-product text-[20px] font-semibold">
        Description:
      </div>
      <p className="leading-6">{productDetail.description}</p>
      <Divider className="my-2" />
      <p className="mb-3">Sold by : {productDetail.seller}</p>
      {user.name !== "" ? null : (
        <Button
          type="text"
          danger
          className="pl-0"
          onClick={() => navigate("/login")}
        >
          Hãy đăng nhập để có thể gửi đánh giá của bạn
        </Button>
      )}
    </div>
  );
};

export default InforDetailProduct;
