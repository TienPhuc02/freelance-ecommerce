import { Col, Image, Modal, Row, Upload } from "antd";
import type { FormProps, GetProp, UploadFile, UploadProps } from "antd";
import { Button, Form, Input } from "antd";
import { APIUpdateUserById } from "../../../services/api";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

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
    avatar: {
      public_id: string;
      url: string;
    };
  };
};

type FieldTypeForm = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ModalUpdateUser = ({
  isModalUpdateUserOpen,
  handleOkModalUpdateUser,
  handleCancelModalUpdateUser,
  dataUserUpdate,
  setIsLoading,
  getAllUserTable,
}: PropModalUpdateUser) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(dataUserUpdate.avatar.url);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    form.setFieldsValue({ avatar: file as string });
    setAvatar(file as string);
    onSuccess("ok");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setAvatar(newFileList[0].originFileObj as any);
    } else {
      setAvatar(dataUserUpdate.avatar.url);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    form.setFieldsValue(dataUserUpdate);
    setAvatar(dataUserUpdate.avatar.url);

    setFileList([
      {
        uid: "-1",
        name: "avatar.png",
        status: "done",
        url: dataUserUpdate.avatar.url,
      },
    ]);
  }, [dataUserUpdate, form]);

  const onFinish: FormProps<FieldTypeForm>["onFinish"] = async (values) => {
    setIsLoading(true);
    const res = await APIUpdateUserById(
      dataUserUpdate.id,
      values.name,
      values.email,
      values.role,
      values.avatar
    );
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
      width={600}
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
        <Row>
          <Col span={12}>
            <Form.Item<FieldTypeForm>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldTypeForm>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item<FieldTypeForm>
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
                <Input type="hidden" name="avatar" value={avatar} />
              </>
            </Form.Item>
          </Col>
        </Row>
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
