import { Descriptions, Divider, Table } from "antd";

type TableInvoiceProps = {
  orderItems: OrderItem[];
  meOrderDetails: Order | null;
};

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    render: (record: OrderItem) => {
      return <>${record.price}</>;
    },
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Total",
    render: (record: any) => {
      return <>${record.quantity * record.price}</>;
    },
  },
];

const TableInvoiceMeOrder = ({
  orderItems,
  meOrderDetails,
}: TableInvoiceProps) => {
  console.log("check me order detail", meOrderDetails);
  const items: any = meOrderDetails && [
    {
      key: "1",
      label: "SubTotal",
      children: <>${meOrderDetails.itemsPrice}</>,
    },
    {
      key: "2",
      label: <>Tax {meOrderDetails.taxAmount}%</>,
      children: <>${meOrderDetails.itemsPrice * meOrderDetails.taxAmount}</>,
    },
    {
      key: "3",
      label: <>Shipping</>,
      children: <>${meOrderDetails.shippingAmount}</>,
    },
    {
      key: "4",
      label: <>Grand total</>,
      children: (
        <>
          $
          {meOrderDetails.shippingAmount +
            meOrderDetails.itemsPrice * meOrderDetails.taxAmount +
            meOrderDetails.itemsPrice}
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orderItems} pagination={false} />
      <Descriptions bordered items={items} column={1} />
      <div className="notice mt-4">
        <span className="font-semibold">Chú ý: </span>
        Khoản phí phạt 1,5% sẽ được thực hiện đối với số dư chưa thanh toán sau
        30 ngày
      </div>
      <Divider className="my-3" />
      <div className="text-center">
        Hóa đơn được tạo trên máy tính và có giá trị không cần chữ ký
      </div>
    </>
  );
};

export default TableInvoiceMeOrder;
