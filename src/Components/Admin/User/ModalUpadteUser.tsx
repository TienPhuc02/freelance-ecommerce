import { Modal } from "antd";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { APIUpdateUserById } from "../../../services/api";
import { useEffect } from "react";

type PropModalUpdateUser = {
  isModalUpdateUserOpen: boolean;
  handleOkModalUpdateUser: () => void;
  handleCancelModalUpdateUser: () => void;
  getAllUserTable: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserUpdate: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
};
type FieldTypeForm = {
  name: string;
  email: string;
  role: string;
};

const ModalUpdateUser = ({
  isModalUpdateUserOpen,
  handleOkModalUpdateUser,
  handleCancelModalUpdateUser,
  dataUserUpdate,
  setIsLoading,
  getAllUserTable,
}: PropModalUpdateUser) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(dataUserUpdate);
  }, [dataUserUpdate, form]);
  console.log(dataUserUpdate);
  const onFinish: FormProps<FieldTypeForm>["onFinish"] = async (values) => {
    console.log("Success:", values);
    setIsLoading(true);
    const res = await APIUpdateUserById(
      dataUserUpdate.id,
      values.name,
      values.email,
      values.role
    );
    console.log(res);
    if (res && res.data) {
      handleCancelModalUpdateUser();
      getAllUserTable();
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldTypeForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title="Update User Modal"
      open={isModalUpdateUserOpen}
      onOk={handleOkModalUpdateUser}
      onCancel={handleCancelModalUpdateUser}
      okButtonProps={{ style: { backgroundColor: "#167fff" } }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldTypeForm>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldTypeForm>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldTypeForm>
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please input your role!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bg-[#167fff]" type="primary" htmlType="submit">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalUpdateUser;
