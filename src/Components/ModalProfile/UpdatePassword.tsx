import { Card } from "antd";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { APIUpdatePassword } from "../../services/api";

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
};
interface PropType {
  handleCancel: () => void;
}

const UpdatePassword = ({ handleCancel }: PropType) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await APIUpdatePassword(values.oldPassword, values.newPassword);
    console.log(res);
    if (res && res.data) {
      handleCancel();
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
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your Old Password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your New Password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button className="bg-[#167fff]" type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default UpdatePassword;
