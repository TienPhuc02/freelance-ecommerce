import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Input, Popconfirm, Space, Table } from "antd";
import type {
  InputRef,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  APIDeleteUserById,
  APIGetAllUsers,
  APIGetUserById,
} from "../../../services/api";
import DrawerDetailUser from "./DrawerUser";
import {
  ImportOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ModalCreateUser from "./ModalCreateUser";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import ModalUpdateUser from "./ModalUpadteUser";
import ModalCreateUserXLSX from "./ModalCreateUserXLSX";

interface DataTypeUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
type DataIndex = keyof DataTypeUser;
const AdminUser: React.FC = () => {
  const [listUser, setListUser] = useState<DataTypeUser[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataExcel, setDataExcel] = useState<DataExcel[] | never[]>([]);
  console.log("check dataExcel>>>", dataExcel);
  const [fileList, setFileList] = useState([]);
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
  const [isModalOpenModalCreateUser, setIsModalOpenModalCreateUser] =
    useState(false);
  const [isModalUpdateUserXLSXOpen, setIsModalUpdateUserXLSXOpen] =
    useState(false);

  const showModalCreateUser = () => {
    setIsModalOpenModalCreateUser(true);
  };

  const handleOkModalCreateUser = () => {
    setIsModalOpenModalCreateUser(false);
  };

  const handleCancelModalCreateUser = () => {
    setIsModalOpenModalCreateUser(false);
  };
  const showModalCreateUserXLSX = () => {
    setIsModalUpdateUserXLSXOpen(true);
  };

  const handleOkModalCreateUserXLSX = () => {
    setIsModalUpdateUserXLSXOpen(false);
    setDataExcel([]);
    setFileList([]);
    setIsModalUpdateUserXLSXOpen(false);
  };

  const handleCancelModalCreateUserXLSX = () => {
    setIsModalUpdateUserXLSXOpen(false);
    setDataExcel([]);
    setFileList([]);
    setIsModalUpdateUserXLSXOpen(false);
  };
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

  const handleDeleteUser = async (id: string) => {
    setIsLoading(true);
    const res = await APIDeleteUserById(id);
    if (res && res.data) {
      getAllUserTable();
    }
    setIsLoading(false);
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataTypeUser> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      ...getColumnSearchProps("role"),
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
      title: "Updated At",
      dataIndex: "updatedAt",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
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
              onConfirm={() => handleDeleteUser(record)}
              okButtonProps={{ style: { backgroundColor: "#167fff" } }}
              okText="Delete"
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

  const onChange: TableProps<DataTypeUser>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex | "">("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div>
      <div className="btn-export btn-import mb-4 btn-create flex justify-end">
        <Button type="primary" className="" onClick={showModalCreateUser}>
          Create User
        </Button>
        <Button
          type="text"
          className="ml-4 flex items-center"
          onClick={showModalCreateUserXLSX}
        >
          <ImportOutlined />
          Import User For XLSX
        </Button>
      </div>
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
      <ModalCreateUser
        isModalOpenModalCreateUser={isModalOpenModalCreateUser}
        handleOkModalCreateUser={handleOkModalCreateUser}
        handleCancelModalCreateUser={handleCancelModalCreateUser}
      />
      <ModalCreateUserXLSX
        fileList={fileList}
        isModalUpdateUserXLSXOpen={isModalUpdateUserXLSXOpen}
        handleOkModalCreateUserXLSX={handleOkModalCreateUserXLSX}
        setDataExcel={setDataExcel}
        setFileList={setFileList}
        dataExcel={dataExcel}
        handleCancelModalCreateUserXLSX={handleCancelModalCreateUserXLSX}
        setIsModalUpdateUserXLSXOpen={setIsModalUpdateUserXLSXOpen}
      />
    </div>
  );
};

export default AdminUser;
