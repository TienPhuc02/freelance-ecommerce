import { Card, Select } from "antd";
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { SELECT_COUNTRY } from "../../constant/main.constant";
import { IDataCreateOrder } from "../../pages/CheckOut/CheckOut";
import type { FormProps } from "antd";
type FieldType = {
  address: string;
  city: string;
  phoneNumber: string;
  zipCode: string;
  country: string;
};
interface IProps {
  setDataOrder: React.Dispatch<React.SetStateAction<IDataCreateOrder>>;
  dataOrder: IDataCreateOrder;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const ShippingInfo = ({ setDataOrder, dataOrder, setCurrentStep }: IProps) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    setCurrentStep(1);
    setDataOrder({
      ...dataOrder,
      shippingInfo: {
        address: values.address,
        city: values.city,
        phoneNumber: values.phoneNumber,
        zipCode: values.zipCode,
        country: values.country,
      },
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    form.setFieldsValue(dataOrder.shippingInfo);
  }, [dataOrder, form]);
  return (
    <div className="max-w-[500px] mx-auto mt-2">
      <Card style={{ width: 500, height: 500 }}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your City!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone No"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phoneNumber!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Phone number must be digits only!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="ZipCode"
            name="zipCode"
            rules={[
              { required: true, message: "Please input your ZipCode!" },
              {
                pattern: /^[0-9]*$/,
                message: "Phone number must be digits only!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your Country!" }]}
          >
            <Select
              allowClear
              options={SELECT_COUNTRY}
              className="border rounded-lg"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            labelCol={{ span: 24 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#167fff] mt-3 px-[40px]"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ShippingInfo;
