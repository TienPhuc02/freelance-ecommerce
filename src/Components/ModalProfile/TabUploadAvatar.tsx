import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

import { APIAccount, APIUploadAvatar } from "../../services/api";
import { getAccountRedux } from "../../redux/features/account/accountSlice";
import { useDispatch } from "react-redux";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface PropType {
  handleCancel: () => void;
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log("check file ", file);
    console.log("check reader ", reader);
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const TabUploadAvatar = ({ handleCancel }: PropType) => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const dummyRequest = async ({ file, onSuccess }: any) => {
    console.log(file);
    const res = await APIUploadAvatar(file);
    if (res && res.data) {
      onSuccess("ok");
    }
  };
  const refreshUserData = async () => {
    const res = await APIAccount();
    console.log("res account ", res);
    if (res && res.data) {
      message.success(res.data.message);
      dispatch(getAccountRedux(res.data.user));
    }
    handleCancel();
  };
  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        multiple={false}
        onChange={handleChange}
        maxCount={1}
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
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Button
        onClick={() => refreshUserData()}
        className="bg-[#167fff]"
        type="primary"
      >
        Upload Avatar
      </Button>
    </>
  );
};
export default TabUploadAvatar;
