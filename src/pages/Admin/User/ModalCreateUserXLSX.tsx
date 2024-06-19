import { InboxOutlined } from "@ant-design/icons";
import { Modal, Table, Upload, message, notification } from "antd";
import React from "react";
import * as XLSX from "xlsx";
import template from "./data/template.xlsx?url";
import { APICreateBulkUser } from "../../../services/api";
type IProps = {
  isModalUpdateUserXLSXOpen: boolean;
  handleOkModalCreateUserXLSX: () => void;
  handleCancelModalCreateUserXLSX: () => void;
  setIsModalUpdateUserXLSXOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataExcel: React.Dispatch<React.SetStateAction<DataExcel[] | never[]>>;
  setFileList: React.Dispatch<React.SetStateAction<never[]>>;
  dataExcel: never[] | DataExcel[];
  fileList: never[];
  getAllUserTable: () => Promise<void>;
};

const ModalCreateUserXLSX = ({
  isModalUpdateUserXLSXOpen,
  handleCancelModalCreateUserXLSX,
  setDataExcel,
  setFileList,
  dataExcel,
  getAllUserTable,
  fileList,
  setIsModalUpdateUserXLSXOpen,
}: IProps) => {
  const uploading = false;
  const { Dragger } = Upload;

  const columns = [
    {
      title: "Tên hiển thị",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];
  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess?.("ok");
    }, 0);
  };

  const isUploadButtonDisabled = fileList.length === 0;
  const propsUpload = {
    name: "file",
    multiple: true,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest,
    onChange(info: {
      file: { name?: any; status?: any };
      fileList: string | any[];
    }) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "removed") {
        setDataExcel([]);
        setFileList([]);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          setFileList(file);
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const result = e?.target?.result;
            if (result instanceof ArrayBuffer) {
              const data = new Uint8Array(result);
              const workbook = XLSX.read(data, { type: "array" });
              const sheet = workbook.Sheets[workbook.SheetNames[0]];
              const json = XLSX.utils.sheet_to_json(sheet, {
                header: ["name", "email", "role"],
                range: 1,
              }) as DataExcel[];

              if (json && json.length > 0) {
                setDataExcel(json);
              }
            } else {
              // Handle null or unexpected types here
              console.error("Invalid file format or content.");
            }
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: { dataTransfer: { files: any } }) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmitCreateUserBulk = async () => {
    const data = dataExcel.map((item) => {
      item.password = "123456";
      return item;
    });
    const res = await APICreateBulkUser(data);
    console.log(res);
    if (res.data) {
      notification.success({
        description: `Success:${res.data.countSuccess} ,Error:${res.data.countError}`,
        message: "upload thành công",
      });
      setDataExcel([]);
      setFileList([]);
      setIsModalUpdateUserXLSXOpen(false);
      getAllUserTable();
    } else {
      notification.error({
        message: "upload thất bại",
      });
      setDataExcel([]);
      setFileList([]);
      setIsModalUpdateUserXLSXOpen(false);
      getAllUserTable();
    }
  };

  return (
    <div>
      <Modal
        width={"800px"}
        title="Import Data User"
        open={isModalUpdateUserXLSXOpen}
        onCancel={handleCancelModalCreateUserXLSX}
        onOk={handleSubmitCreateUserBulk}
        okText="Import Data"
        okButtonProps={{
          loading: uploading,
          disabled: isUploadButtonDisabled,
        }}
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload .csv, xls ,xlsx .or &nbsp;
            <a href={template} download onClick={(e) => e.stopPropagation()}>
              {" "}
              Tải về Dữ liệu người dùng mẫu
            </a>
          </p>
        </Dragger>
        <p className="my-3">Dữ liệu Upload:</p>
        <Table columns={columns} dataSource={dataExcel}></Table>
      </Modal>
    </div>
  );
};

export default ModalCreateUserXLSX;
