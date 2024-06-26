import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps, TooltipProps } from "antd";
import { APIMeOrder } from "../../services/api";

import { useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  showSorterTooltip?: boolean | TooltipProps;
}

const TableOrder: React.FC = () => {
  const [listMeOrder, setListMeOrder] = useState([]);
  const navigate = useNavigate();
  const handleRedirectItemOrderDetail = (record: string) => {
    navigate(`/me/orders/${record}`);
  };
  const handleRedirectInvoiceOrder = (record: string) => {
    navigate(`/invoice/orders/${record}`);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "AMount",
      dataIndex: "totalAmount",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Payment Status",
      dataIndex: "orderStatus",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (record: any) => {
        return (
          <div className="flex gap-3">
            <Button
              onClick={() => handleRedirectItemOrderDetail(record)}
              type="text"
            >
              View
            </Button>
            <Button
              type="text"
              onClick={() => handleRedirectInvoiceOrder(record)}
            >
              Invoice
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const getAPIMeOrder = async () => {
    const res = await APIMeOrder();
    console.log("check res me order ", res);
    if (res && res.data) {
      const ordersWithKeys = res.data.orders.map((order: any) => ({
        ...order,
        key: order._id,
      }));
      setListMeOrder(ordersWithKeys);
    }
  };
  useEffect(() => {
    getAPIMeOrder();
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={listMeOrder}
      onChange={onChange}
      rowClassName="hover-row"
      showSorterTooltip={{ title: "sorter-icon" }}
      pagination={{}}
    />
  );
};

export default TableOrder;
