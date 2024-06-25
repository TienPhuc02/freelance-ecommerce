import { Col, Image, Modal, Row, Select, Upload } from "antd";
import type { FormProps, GetProp, UploadFile, UploadProps } from "antd";
import { Button, Form, Input } from "antd";
import { APIUpdateProduct } from "../../../services/api";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  SELECT_CATEGORY,
  SELECT_SELLER,
} from "../../../constant/main.constant";

type PropModalUpdateProduct = {
  isModalUpdateProductOpen: boolean;
  handleOkModalUpdateProduct: () => void;
  handleCancelModalUpdateProduct: () => void;
  getAllListProduct: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dataProductUpdate: {
    id: string;
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: { url: string }[];
    category: string;
    seller: string;
    stock: number;
    numOfReview: number;
    reviews: any[];
    createdAt?: string;
    updatedAt?: string;
  };
};

type FieldTypeForm = {
  name: string;
  email: string;
  role: string;
  avatar: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ModalUpdateProduct = ({
  isModalUpdateProductOpen,
  handleOkModalUpdateProduct,
  handleCancelModalUpdateProduct,
  dataProductUpdate,
  setIsLoading,
  getAllListProduct,
}: PropModalUpdateProduct) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
    form.setFieldsValue({ images: file as File });
    setUploadedFiles((prevState) => [...prevState, file.originFileObj]);
    onSuccess("ok");
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

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
  console.log("check dataProductUpdate", dataProductUpdate);
  useEffect(() => {
    form.setFieldsValue(dataProductUpdate);
    const initialFileList = dataProductUpdate?.images?.map((image, index) => ({
      key: index,
      uid: String(index),
      name: `image-${index}.png`,
      status: "done",
      url: image.url,
    }));
    setFileList(initialFileList as any);
  }, [dataProductUpdate, form]);

  const onFinish: FormProps<FieldTypeForm>["onFinish"] = async (values) => {
    setIsLoading(true);
    const formData = { ...values, images: uploadedFiles };
    console.log("check fromData", formData);
    const res = await APIUpdateProduct(formData);
    if (res && res.data) {
      handleCancelModalUpdateProduct();
      getAllListProduct();
      setIsLoading(false);
    }
  };

  const { TextArea } = Input;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const onFinishFailed: FormProps<FieldTypeForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Update Product Modal"
      open={isModalUpdateProductOpen}
      onOk={handleOkModalUpdateProduct}
      onCancel={handleCancelModalUpdateProduct}
      okButtonProps={{ style: { backgroundColor: "#167fff" } }}
      width={800}
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
              rules={[{ required: true, message: "Please input your Price!" }]}
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
              rules={[{ required: true, message: "Please input your Seller!" }]}
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
              rules={[{ required: true, message: "Please input your Stock!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Images Product"
          name="images"
          rules={[{ required: true, message: "Please upload images!" }]}
        >
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
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input a description!" }]}
        >
          <TextArea
            allowClear
            showCount
            maxLength={700}
            onChange={onChange}
            placeholder="Description New Product"
            style={{ height: 120, resize: "none", width: 500 }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bg-[#167fff]" type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalUpdateProduct;
