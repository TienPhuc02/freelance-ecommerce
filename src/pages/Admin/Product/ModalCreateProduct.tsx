import React, { useState } from "react";
import { Col, Modal, Row, Select } from "antd";
import type { FormProps, GetProp } from "antd";
import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import {
  SELECT_CATEGORY,
  SELECT_SELLER,
} from "../../../constant/main.constant";
import { APICreateNewProduct } from "../../../services/api";

type TypePropModalCreateProduct = {
  handleOkModalCreateProduct: () => void;
  handleCancelModalCreateProduct: () => void;
  isModalOpenModalCreateProduct: boolean;
  setIsModalOpenModalCreateProduct: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const ModalCreateProduct = ({
  handleOkModalCreateProduct,
  handleCancelModalCreateProduct,
  isModalOpenModalCreateProduct,
  setIsModalOpenModalCreateProduct,
}: TypePropModalCreateProduct) => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  // Utility function to get base64 string from a file
  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  console.log("check fileList", fileList);
  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    const formData = { ...values, images: uploadedFiles };
    console.log("check fromData", formData);
    const res = await APICreateNewProduct(formData);
    console.log("check res", res);
    setIsModalOpenModalCreateProduct(false);
  };

  const { TextArea } = Input;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setUploadedFiles((prevState) => [...prevState, file.originFileObj]);

    console.log("check file", file);
    onSuccess("ok");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update fileList state

    // Update uploadedFiles state with actual File objects
    const files = newFileList.map((file) => file.originFileObj as File);
    setUploadedFiles(files);

    form.setFieldsValue({ images: newFileList }); // Update form field with new fileList
  };

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
        title="Modal Create Product"
        open={isModalOpenModalCreateProduct}
        onOk={handleOkModalCreateProduct}
        onCancel={handleCancelModalCreateProduct}
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
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your Price!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Ratings"
                name="ratings"
                rules={[
                  { required: true, message: "Please input your Ratings!" },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3" },
                    { value: 4, label: "4" },
                    { value: 5, label: "5" },
                  ]}
                  className="border rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Categories"
                name="category"
                rules={[
                  { required: true, message: "Please input your category!" },
                ]}
              >
                <Select
                  allowClear
                  options={SELECT_CATEGORY}
                  className="border rounded-lg"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Seller"
                name="seller"
                rules={[
                  { required: true, message: "Please input your Seller!" },
                ]}
              >
                <Select
                  allowClear
                  options={SELECT_SELLER}
                  className="border rounded-lg"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[
                  { required: true, message: "Please input your Stock!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Images Product"
            name="images"
            rules={[{ required: true, message: "Please upload images!" }]}
          >
            <>
              <Upload
                multiple={true}
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={dummyRequest}
              >
                {fileList.length >= 5 ? null : uploadButton}
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
            </>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input a description!" }]}
          >
            <TextArea
              allowClear
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="description product"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create New Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateProduct;
