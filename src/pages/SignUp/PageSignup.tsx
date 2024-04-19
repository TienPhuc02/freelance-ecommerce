import React from "react";
import { Button, Form, type FormProps, Input, message } from "antd";
import { APIRegister } from "../../services/api";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
  name: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRedirectLogin = () => {
    navigate("/login");
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const res = await APIRegister(values.name, values.email, values.password);
      console.log(res);
      if (res) {
        message.success(res.data.message);
        navigate("/login");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
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
        <p className="text-center text-[20px]">Register Account</p>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              pattern: /^[a-zA-ZÀ-Ỹà-ỹ]+$/, // Chỉ chấp nhận chữ cái có dấu
              message: "Only letters are allowed",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, // Chỉ chấp nhận chữ cái có dấu
              message: "Only letters are allowed",
            },
          ]}
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#167fff] ml-0 w-full"
          >
            SignUp User
          </Button>
        </Form.Item>
        <p
          className="underline mb-4 flex justify-end cursor-pointer"
          onClick={handleRedirectLogin}
        >
          Have an User ?
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;
