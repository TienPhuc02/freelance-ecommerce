import React, { useEffect, useRef, useState } from "react";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Popconfirm, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {
  APIAllOrdersAdmin,
  APIDeleteOrderById,
  APIMeOrderItemsDetail,
} from "../../../services/api";
import { convertDateCol } from "../../../utils/func.customize.date";
import DrawerOrder from "./DrawerOrder";
import ModalUpdateOrder from "./ModalUpdateOrder";

type DataIndex = keyof OrderTable;

const AdminOrder = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listOrderAdmin, setListOrderAdmin] = useState([]);
  const [dataOrderView, setDataOrderView] = useState<OrderViewDrawer>({
    shippingInfo: {
      address: "",
      city: "",
      phoneNumber: "",
      zipCode: "",
      country: "",
    },
    paymentInfo: {
      status: "",
    },
    _id: "",
    user: {
      avatar: {
        public_id: "",
        url: "",
      },
      _id: "",
      name: "",
      email: "",
      role: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      resetPasswordExpire: "",
      resetPasswordToken: "",
    },
    orderItems: [
      {
        name: "",
        quantity: "",
        price: "",
        product: {
          _id: "",
          name: "",
          price: 0,
          description: "",
          ratings: 0,
          images: [
            {
              public_id: "",
              url: "",
              _id: "",
            },
          ],
          category: "",
          seller: "",
          stock: 0,
          numOfReview: 0,
          reviews: [],
          __v: 0,
          createdAt: "",
          updatedAt: "",
        },
        _id: "",
      },
    ],
    paymentMethod: "",
    itemsPrice: 0,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
    orderStatus: "",
    createdAt: "",
    updatedAt: "",
  });
  const [dataOrderUpdate, setDataOrderUpdate] = useState<OrderUpdate>({
    shippingInfo: {
      address: "",
      city: "",
      phoneNumber: "",
      zipCode: "",
      country: "",
    },
    paymentInfo: {
      status: "",
    },
    _id: "",
    user: {
      name: "",
      email: "",
    },
    orderItems: [
      {
        name: "",
        quantity: 0,
        price: 0,
        product: {
          _id: "",
          name: "",
          price: 0,
          description: "",
          ratings: 0,
          images: [
            {
              public_id: "",
              url: "",
              _id: "",
            },
          ],
          category: "",
          seller: "",
          stock: 0,
          numOfReview: 0,
          reviews: [],
          __v: 0,
          createdAt: "",
          updatedAt: "",
        },
        _id: "",
      },
    ],
    paymentMethod: "",
    itemsPrice: 0,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
    orderStatus: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isModalUpdateOrderOpen, setIsModalUpdateOrderOpen] = useState(false);
  const handleCancelModalUpdateOrder = () => {
    setIsModalUpdateOrderOpen(false);
  };
  const handleShowModalUpdateOrder = async (id: string) => {
    const res = await APIMeOrderItemsDetail(id);
    if (res && res?.data) {
      setDataOrderUpdate({
        shippingInfo: res.data.order.shippingInfo,
        paymentInfo: res.data.order.paymentInfo,
        _id: res.data.order._id,
        user: res.data.order.user,
        orderItems: res.data.order.orderItems,
        paymentMethod: res.data.order.paymentMethod,
        itemsPrice: res.data.order.itemsPrice,
        taxAmount: res.data.order.taxAmount,
        shippingAmount: res.data.order.shippingAmount,
        totalAmount: res.data.order.totalAmount,
        orderStatus: res.data.order.orderStatus,
        createdAt: res.data.order.createdAt,
        updatedAt: res.data.order.updatedAt,
      });
      setIsModalUpdateOrderOpen(true);
    }
  };
  const showDrawer = async () => {
    setOpenDrawer(true);
  };
  const handleDeleteOrder = async (id: string) => {
    setIsLoading(true);
    const res = await APIDeleteOrderById(id);
    if (res && res.data) {
      getAPIAllOrderAdmin();
    }
    setIsLoading(false);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const getAPIAllOrderAdmin = async () => {
    const res = await APIAllOrdersAdmin();
    console.log(res);
    if (res && res.data) {
      message.success(res.data.message);
      setListOrderAdmin(res.data.order);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getOrderById = async (id: string) => {
    setIsLoading(true);
    const res = await APIMeOrderItemsDetail(id);
    console.log("res check product detail", res);
    if (res && res.data) {
      const order = res.data.order;
      setDataOrderView({
        shippingInfo: order.shippingInfo,
        createdAt: order.createdAt,
        itemsPrice: order.itemsPrice,
        orderItems: order.orderItems,
        orderStatus: order.orderStatus,
        paymentInfo: order.paymentInfo,
        paymentMethod: order.paymentMethod,
        shippingAmount: order.shippingAmount,
        taxAmount: order.taxAmount,
        totalAmount: order.totalAmount,
        updatedAt: order.updatedAt,
        user: order.user,
        _id: order._id,
      });
      showDrawer();
    }
    setIsLoading(false);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<OrderTable> => ({
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

  const columns: TableColumnsType<OrderTable> = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (record: any) => {
        return (
          <div
            onClick={() => getOrderById(record)}
            className="hover:text-[#167fff] cursor-pointer"
          >
            {record}
          </div>
        );
      },
    },
    {
      title: "paymentMethod",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Items Price",
      dataIndex: "itemsPrice",
      key: "itemsPrice",
      sorter: (a, b) => a.itemsPrice - b.itemsPrice,
      ...getColumnSearchProps("itemsPrice"),
      sortDirections: ["descend", "ascend"],
      render: (record: any) => {
        return <>{record.toFixed(2)}</>;
      },
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmount",
      ...getColumnSearchProps("taxAmount"),
      sorter: (a, b) => a.taxAmount - b.taxAmount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Shipping Amount",
      dataIndex: "shippingAmount",
      key: "shippingAmount",
      ...getColumnSearchProps("shippingAmount"),
      sorter: (a, b) => a.shippingAmount - b.shippingAmount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      ...getColumnSearchProps("totalAmount"),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      ...getColumnSearchProps("orderStatus"),
      sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (record: any) => {
        return <>{convertDateCol(record)}</>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
          <div className="flex">
            <Popconfirm
              title="Delete This User"
              description="Are you sure to delete this user?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDeleteOrder(record)}
              okButtonProps={{ style: { backgroundColor: "#167fff" } }}
              okText="Delete"
            >
              <Button type="primary" className="mr-3 bg-[#167fff]">
                Delete
              </Button>
            </Popconfirm>
            <Button onClick={() => handleShowModalUpdateOrder(record)}>
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getAPIAllOrderAdmin();
  }, []);
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listOrderAdmin}
        scroll={{ x: 1500 }}
        pagination={{
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
      <DrawerOrder
        onCloseDrawer={onCloseDrawer}
        openDrawer={openDrawer}
        dataOrderView={dataOrderView}
        convertDateCol={convertDateCol}
      />
      <ModalUpdateOrder
        getAPIAllOrderAdmin={getAPIAllOrderAdmin}
        dataOrderUpdate={dataOrderUpdate}
        handleCancelModalUpdateOrder={handleCancelModalUpdateOrder}
        isModalUpdateOrderOpen={isModalUpdateOrderOpen}
      />
    </>
  );
};

export default AdminOrder;
