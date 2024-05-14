import React, { useEffect, useState } from "react";
import { Image, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { APIGetAllUsers, APIGetUserById } from "../../../services/api";
import DrawerDetailUser from "./DrawerUser";

interface DataTypeUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUser: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    url: "",
    createdAt: "",
    resetPasswordExpire: "",
  });
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const getUserById = async (id: string) => {
    const res = await APIGetUserById(id);
    console.log(res);
    if (res && res.data) {
      setDataUser({
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
  };
  console.log(">> check data dataUser", dataUser);
  const convertDateCol = (dateInput: string) => {
    // Create a new Date object from the given string
    const date = new Date(dateInput);

    // Extract day, month, and year components
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Month is zero-indexed, so add 1
    const year = date.getUTCFullYear();

    // Format day and month to have leading zeros if needed
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    // Construct the date in dd/mm/yyyy format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  };
  const columns: TableColumnsType<DataTypeUser> = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (record: any) => {
        return (
          <div
            onClick={() => getUserById(record)}
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
          <>
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
          </>
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
    },
  ];

  const [listUser, setListUser] = useState<DataTypeUser[]>([]);
  const getAllUserTable = async () => {
    const res = await APIGetAllUsers();
    console.log(res);
    if (res && res.data) {
      setListUser(res.data.users);
    }
  };
  useEffect(() => {
    getAllUserTable();
  }, []);
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
        showDrawer={showDrawer}
        openDrawer={openDrawer}
        dataUser={dataUser}
        convertDateCol={convertDateCol}
      />
    </div>
  );
};

export default AdminUser;
