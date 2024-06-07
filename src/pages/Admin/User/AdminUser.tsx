import React, { useEffect, useState } from "react";
import { Button, Image, Popconfirm, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  APIDeleteUserById,
  APIGetAllUsers,
  APIGetUserById,
} from "../../../services/api";
import DrawerDetailUser from "./DrawerUser";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ModalUpdateUser from "./ModalUpadteUser";

interface DataTypeUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUser: React.FC = () => {
  const [listUser, setListUser] = useState<DataTypeUser[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUserView, setDataUserView] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    url: "",
    createdAt: "",
    resetPasswordExpire: "",
  });
  const [dataUserUpdate, setDataUserUpdate] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [isModalUpdateUserOpen, setIsModalUpdateUserOpen] = useState(false);

  const handleShowModalUpdateUser = async (id: string) => {
    const res = await APIGetUserById(id);
    if (res && res?.data) {
      setDataUserUpdate({
        name: res.data?.user?.name,
        id: res.data?.user?._id,
        role: res.data?.user?.role,
        email: res.data?.user?.email,
      });

      setIsModalUpdateUserOpen(true);
    }
  };

  const handleOkModalUpdateUser = () => {
    setIsModalUpdateUserOpen(false);
  };

  const handleCancelModalUpdateUser = () => {
    setIsModalUpdateUserOpen(false);
  };

  const showDrawer = async () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const getUserById = async (id: string) => {
    setIsLoading(true);
    const res = await APIGetUserById(id);
    if (res && res.data) {
      setDataUserView({
        id: res.data?.user?._id,
        name: res.data?.user?.name,
        role: res.data?.user?.role,
        email: res.data?.user?.email,
        url: res.data.user?.avatar?.url,
        createdAt: res.data.user?.createdAt,
        resetPasswordExpire: res.data.user?.resetPasswordExpire,
      });
      showDrawer();
    }
    setIsLoading(false);
  };

  const convertDateCol = (dateInput: string) => {
    const date = new Date(dateInput);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  };

  const columns: TableColumnsType<DataTypeUser> = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (record: any) => {
        console.log(record);
        return (
          <div
            onClick={() => {
              console.log(record);
              getUserById(record);
            }}
            className="hover:text-[#167fff] cursor-pointer"
          >
            {record}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (record: any) => {
        return (
          <div key={record}>
            {record.url !== "" ? (
              <Image
                width={50}
                height={50}
                src={`${record.url}`}
                alt="avatar user"
              />
            ) : (
              "avatar user"
            )}
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (record: any) => {
        return <>{convertDateCol(record)}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (record: any) => {
        return (
          <>
            <Popconfirm
              title="Delete This User"
              description="Are you sure to delete this user?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              okButtonProps={{ style: { backgroundColor: "#167fff" } }}
              okText={
                <div
                  onClick={() => {
                    console.log(record);
                    handleDeleteUser(record);
                  }}
                >
                  Delete
                </div>
              }
            >
              <Button type="primary" className="mr-3 bg-[#167fff]">
                Delete
              </Button>
            </Popconfirm>
            <Button onClick={() => handleShowModalUpdateUser(record)}>
              Update
            </Button>
          </>
        );
      },
    },
  ];

  const getAllUserTable = async () => {
    setIsLoading(true);
    const res = await APIGetAllUsers();
    if (res && res.data) {
      setListUser(res.data.users);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUserTable();
  }, []);

  const handleDeleteUser = async (id: string) => {
    setIsLoading(true);
    const res = await APIDeleteUserById(id);
    if (res && res.data) {
      getAllUserTable();
    }
    setIsLoading(false);
  };

  const onChange: TableProps<DataTypeUser>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        loading={isLoading}
        scroll={{ x: 1500 }}
        columns={columns}
        dataSource={listUser}
        onChange={onChange}
        pagination={{
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
      <DrawerDetailUser
        onCloseDrawer={onCloseDrawer}
        openDrawer={openDrawer}
        dataUserView={dataUserView}
        convertDateCol={convertDateCol}
      />
      <ModalUpdateUser
        isModalUpdateUserOpen={isModalUpdateUserOpen}
        handleOkModalUpdateUser={handleOkModalUpdateUser}
        handleCancelModalUpdateUser={handleCancelModalUpdateUser}
        dataUserUpdate={dataUserUpdate}
        setIsLoading={setIsLoading}
        getAllUserTable={getAllUserTable}
      />
    </div>
  );
};

export default AdminUser;
