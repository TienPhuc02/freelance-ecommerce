import { Col, Form, Input, Modal, Row, Button } from "antd";
import { useEffect } from "react";
// import { APIUpdateOrderStatus } from "../../../services/api"; // Giả sử API này tồn tại
import type { FormProps } from "antd";
import { APIUpdateOrderById } from "../../../services/api";

type PropModalUpdateOrder = {
  isModalUpdateOrderOpen: boolean;
  //   handleOkModalUpdateOrder: () => void;
  handleCancelModalUpdateOrder: () => void;
  dataOrderUpdate: OrderUpdate;
  getAPIAllOrderAdmin: () => Promise<void>;
};

type FieldTypeForm = {
  orderStatus: string;
};

const ModalUpdateOrder = ({
  isModalUpdateOrderOpen,
  getAPIAllOrderAdmin,
  handleCancelModalUpdateOrder,
  dataOrderUpdate,
}: PropModalUpdateOrder) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataOrderUpdate);
  }, [dataOrderUpdate, form]);

  const onFinish: FormProps<FieldTypeForm>["onFinish"] = async (values) => {
    console.log(values);
    const res = await APIUpdateOrderById(
      dataOrderUpdate._id,
      values.orderStatus
    );
    console.log(res);
    if (res && res.data) {
      getAPIAllOrderAdmin();
      //   setIsLoading(false);
      handleCancelModalUpdateOrder();
    }
  };

  const onFinishFailed: FormProps<FieldTypeForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue(dataOrderUpdate);
  }, [dataOrderUpdate, form]);
  return (
    <Modal
      title="Order Detail"
      open={isModalUpdateOrderOpen}
      onOk={form.submit}
      onCancel={handleCancelModalUpdateOrder}
      okButtonProps={{ style: { backgroundColor: "#167fff" } }}
      width={800}
    >
      <Form
        form={form}
        name="orderDetail"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item label="User Name" name={["user", "name"]}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="User Email" name={["user", "email"]}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Shipping Address"
              name={["shippingInfo", "address"]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City" name={["shippingInfo", "city"]}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name={["shippingInfo", "phoneNumber"]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zip Code" name={["shippingInfo", "zipCode"]}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Country" name={["shippingInfo", "country"]}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Payment Status" name={["paymentInfo", "status"]}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Payment Method" name="paymentMethod">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Items Price" name="itemsPrice">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Tax Amount" name="taxAmount">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Shipping Amount" name="shippingAmount">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Total Amount" name="totalAmount">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Order Status"
              name="orderStatus"
              rules={[
                { required: true, message: "Please input the order status!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Created At" name="createdAt">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Updated At" name="updatedAt">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Order
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateOrder;
