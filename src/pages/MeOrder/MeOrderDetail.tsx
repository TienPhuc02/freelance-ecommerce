import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import { APIMeOrderItemsDetail } from "../../services/api";
import { useEffect, useState } from "react";

const MeOrderDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  console.log(id);
  const [listMeOrder, setListMeOrder] = useState([]);
  const GetAPIMeOrderItemsDetail = async () => {
    const res = await APIMeOrderItemsDetail(id as string);
    console.log(res);
  };
  const prepareDataForVerticalDisplay = (order: any) => {
    return [
      { key: "ID", value: order._id },
      { key: "Status", value: order.orderStatus },
      { key: "Date", value: new Date(order.createdAt).toLocaleString() },
    ];
  };
  useEffect(() => {
    GetAPIMeOrderItemsDetail();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Status",
      dataIndex: "statusOrder",
      key: "statusOrder",
      render: (text: any, record: any) => (
        <span style={{ color: record.key === "Status" ? "red" : "inherit" }}>
          {text}
        </span>
      ),
    },
    {
      title:"Date",
      
    }
  ];

  // Assuming you want to show the first order in the list
  const dataSource =
    listMeOrder.length > 0 ? prepareDataForVerticalDisplay(listMeOrder[0]) : [];
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <div className="header-item-order-detail flex items-center justify-between">
        <div>Your Order detail</div>
        <Button type="primary">Invoice</Button>
      </div>
      <div className="status-order">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="key"
          bordered
        />
      </div>
    </div>
  );
};

export default MeOrderDetail;
