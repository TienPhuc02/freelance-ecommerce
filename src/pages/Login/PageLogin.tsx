import React from "react";
import { Button, Form, type FormProps, Input, message } from "antd";
import { APILoginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRedirectSignUp = () => {
    navigate("/signup");
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const res = await APILoginUser(values.email, values.password);
      console.log(res);
      if (res) {
        message.success(res.data.message);
        localStorage.setItem("access_token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      message.error("Thông tin đăng nhập chưa đúng. Vui lòng kiểm tra lại");
      console.log(error);
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
        <p className="text-center text-[20px]">Create Account</p>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, // Chỉ chấp nhận chữ cái có dấu
              message: "Wrong email format",
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
        <p className="underline mb-4 flex justify-end cursor-pointer">
          Forgot Password
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#167fff] ml-0 w-full"
          >
            Login User
          </Button>
        </Form.Item>
        <p
          className="underline mb-4 flex justify-end cursor-pointer"
          onClick={handleRedirectSignUp}
        >
          New User ?
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
