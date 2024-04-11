import React from "react";
import { Button, Form, type FormProps, Input, message } from "antd";
import { APILoginUser } from "../../services/api";

type FieldType = {
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
  console.log("Success:", values);
  const res = await APILoginUser(values.email, values.password);
  console.log(res);
  if (res) {
    message.success(res.data.message);
    localStorage.setItem("access_token", res.data.token);
  }
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage: React.FC = () => {
  return (
    <div className="pt-28">
      <Form
        className="mx-auto max-w-[500px] py-5 px-10 border flex-col justify-center items-center rounded-2xl shadow-lg"
        name="basic"
        labelCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p className="text-center text-[20px]">Create Account</p>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <p className="underline mb-4 flex justify-end">Forgot Password</p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#167fff] ml-0 w-full"
          >
            Login User
          </Button>
        </Form.Item>
        <p className="underline mb-4 flex justify-end">New User ?</p>
      </Form>
    </div>
  );
};

export default LoginPage;
