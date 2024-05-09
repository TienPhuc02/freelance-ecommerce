import { Card } from "antd";
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { APIUpdateProfile } from "../../services/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfileRedux } from "../../redux/features/account/accountSlice";
type FieldType = {
  name?: string;
  email?: string;
};
interface PropType {
  handleCancel: () => void;
}

const TabUpdateProfile = ({ handleCancel }: PropType) => {
  const user = useSelector((state: any) => state?.account);
  const dispatch = useDispatch();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await APIUpdateProfile(values.name, values.email);
    console.log(res);
    if (res && res.data) {
      handleCancel();
      dispatch(updateProfileRedux(values));
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            initialValue={user.name}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            initialValue={user.email}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button className="bg-[#167fff]" type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default TabUpdateProfile;
