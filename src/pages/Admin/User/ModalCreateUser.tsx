import React, { useState } from "react";
import { Col, Modal, Row, Select } from "antd";
import type { FormProps, GetProp } from "antd";
import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { APICreateNewUser } from "../../../services/api";

type TypePropModalCreateUser = {
  handleOkModalCreateUser: () => void;
  handleCancelModalCreateUser: () => void;
  isModalOpenModalCreateUser: boolean;
  setIsModalOpenModalCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCreateUser = ({
  handleOkModalCreateUser,
  handleCancelModalCreateUser,
  isModalOpenModalCreateUser,
  setIsModalOpenModalCreateUser,
}: TypePropModalCreateUser) => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [avatar, setAvatar] = useState<string>("");

  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res = await APICreateNewUser({ ...values, avatar });
    console.log("check res", res);
    setIsModalOpenModalCreateUser(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    console.log("check file", file);
    form.setFieldsValue({ avatar: file as string });
    setAvatar(file as string);
    onSuccess("ok");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Modal Create User"
        open={isModalOpenModalCreateUser}
        onOk={handleOkModalCreateUser}
        onCancel={handleCancelModalCreateUser}
        width={600}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please input your Role!" }]}
              >
                <Select
                  allowClear
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ]}
                  className="border rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[{ required: true, message: "Please upload an avatar!" }]}
          >
            <>
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={dummyRequest}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <Input type="hidden" name="avatar" value={avatar} />
            </>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
