import React, { useEffect, useRef, useState } from "react";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {
  APIDeleteProduct,
  APIGetAllProduct,
  APIGetDetailProduct,
} from "../../../services/api";
import { convertDateCol } from "../../../utils/func.customize.date";
import DrawerProduct from "./DrawerProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";

interface DataProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: Image[];
  category: string;
  seller: string;
  stock: number;
  numOfReview: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

type DataIndex = keyof DataProductType;

const AdminProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpenModalCreateProduct, setIsModalOpenModalCreateProduct] =
    useState(false);
  const [listProduct, setListProduct] = useState<DataProductType[]>([]);
  const searchInput = useRef<InputRef>(null);
  const [dataProductView, setDataProductView] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    ratings: 0,
    images: [],
    seller: "",
    numOfReview: 0,
    category: "",
    stock: 0,
    reviews: [],
    createdAt: "",
    updatedAt: "",
  });
  const [dataProductUpdate, setDataProductUpdate] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    ratings: 0,
    images: [],
    seller: "",
    numOfReview: 0,
    category: "",
    stock: 0,
    reviews: [],
  });
  const [isModalUpdateProductOpen, setIsModalUpdateProductOpen] =
    useState(false);
  const showDrawer = async () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const showModalCreateProduct = () => {
    setIsModalOpenModalCreateProduct(true);
  };

  const handleOkModalCreateProduct = () => {
    setIsModalOpenModalCreateProduct(false);
  };

  const handleCancelModalCreateProduct = () => {
    setIsModalOpenModalCreateProduct(false);
  };
  const handleShowModalUpdateProduct = async (id: string) => {
    const res = await APIGetDetailProduct(id);
    console.log("check res update product", res);
    if (res && res?.data) {
      setDataProductUpdate({
        id: res.data.getProductDetails._id,
        name: res.data.getProductDetails.name,
        price: res.data.getProductDetails.price,
        description: res.data.getProductDetails.description,
        ratings: res.data.getProductDetails.ratings,
        images: res.data.getProductDetails.images,
        seller: res.data.getProductDetails.seller,
        numOfReview: res.data.getProductDetails.numOfReview,
        category: res.data.getProductDetails.category,
        stock: res.data.getProductDetails.stock,
        reviews: res.data.getProductDetails.reviews,
      });
      setIsModalUpdateProductOpen(true);
    }
  };

  const handleOkModalUpdateProduct = () => {
    setIsModalUpdateProductOpen(false);
  };

  const handleCancelModalUpdateProduct = () => {
    setIsModalUpdateProductOpen(false);
  };

  const getAllListProduct = async () => {
    const res = await APIGetAllProduct();
    console.log("check res", res);
    if (res && res.data) {
      setListProduct(res.data.products);
    }
  };
  useEffect(() => {
    getAllListProduct();
  }, []);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleDeleteProduct = async (id: string) => {
    setIsLoading(true);
    const res = await APIDeleteProduct(id);
    if (res && res.data) {
      getAllListProduct();
    }
    setIsLoading(false);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getProductById = async (id: string) => {
    setIsLoading(true);
    const res = await APIGetDetailProduct(id);
    console.log("res check product detail", res);
    if (res && res.data) {
      setDataProductView({
        id: res.data.getProductDetails._id,
        name: res.data?.getProductDetails?.name,
        price: res.data?.getProductDetails?.price,
        description: res.data?.getProductDetails?.description,
        category: res.data.getProductDetails?.category,
        numOfReview: res.data.getProductDetails?.numOfReview,
        ratings: res.data.getProductDetails?.ratings,
        seller: res.data.getProductDetails?.seller,
        stock: res.data.getProductDetails?.stock,
        updatedAt: res.data.getProductDetails?.updatedAt,
        createdAt: res.data.getProductDetails?.createdAt,
        images: res.data.getProductDetails?.images,
        reviews: res.data.getProductDetails?.reviews,
      });
      showDrawer();
    }
    setIsLoading(false);
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataProductType> => ({
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
    onFilter: (value, record) => {
      const data = record[dataIndex];
      return data
        ? data
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false;
    },
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

  const columns: TableColumnsType<DataProductType> = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (record: any) => {
        return (
          <div
            onClick={() => getProductById(record)}
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
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("price"),
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      ...getColumnSearchProps("ratings"),
      sorter: (a, b) => a.ratings - b.ratings,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
      ...getColumnSearchProps("seller"),
      sorter: (a, b) => a.seller.length - b.seller.length,
      sortDirections: ["descend", "ascend"],
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Popconfirm
              title="Delete This Product"
              description="Are you sure to delete this product?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDeleteProduct(record)}
              okButtonProps={{ style: { backgroundColor: "#167fff" } }}
              okText="Delete"
            >
              <Button type="primary" className="mr-3 bg-[#167fff]">
                Delete
              </Button>
            </Popconfirm>
            <Button onClick={() => handleShowModalUpdateProduct(record)}>
              Update
            </Button>
          </div>
        );
      },
    },
  ];
  const onChange: TableProps<DataProductType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="btn-export btn-import mb-4 btn-create flex justify-end">
        <Button type="primary" className="" onClick={showModalCreateProduct}>
          Create New Product
        </Button>
      </div>
      <Table
        loading={isLoading}
        onChange={onChange}
        pagination={{
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        scroll={{ x: 1500 }}
        columns={columns}
        dataSource={listProduct}
      />
      <DrawerProduct
        onCloseDrawer={onCloseDrawer}
        openDrawer={openDrawer}
        dataProductView={dataProductView}
        convertDateCol={convertDateCol}
      />
      <ModalCreateProduct
        setIsModalOpenModalCreateProduct={setIsModalOpenModalCreateProduct}
        isModalOpenModalCreateProduct={isModalOpenModalCreateProduct}
        handleOkModalCreateProduct={handleOkModalCreateProduct}
        handleCancelModalCreateProduct={handleCancelModalCreateProduct}
        getAllListProduct={getAllListProduct}
      />
      <ModalUpdateProduct
        isModalUpdateProductOpen={isModalUpdateProductOpen}
        handleOkModalUpdateProduct={handleOkModalUpdateProduct}
        handleCancelModalUpdateProduct={handleCancelModalUpdateProduct}
        dataProductUpdate={dataProductUpdate}
        setIsLoading={setIsLoading}
        getAllListProduct={getAllListProduct}
      />
    </>
  );
};

export default AdminProduct;
