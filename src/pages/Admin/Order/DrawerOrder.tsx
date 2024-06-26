import { Drawer, Descriptions, Image } from "antd";
import React from "react";

type IDrawerProps = {
  onCloseDrawer: () => void;
  openDrawer: boolean;
  dataOrderView: {
    shippingInfo: {
      address: string;
      city: string;
      phoneNumber: string;
      zipCode: string;
      country: string;
    };
    paymentInfo: {
      status: string;
    };
    _id: string;
    user: {
      avatar: { public_id: string; url: string };
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      resetPasswordExpire: string;
      resetPasswordToken: string;
    };
    orderItems: {
      name: string;
      quantity: string;
      price: string;
      product: {
        _id: string;
        name: string;
        price: number;
        description: string;
        ratings: number;
        images: { public_id: string; url: string; _id: string }[];
        category: string;
        seller: string;
        stock: number;
        numOfReview: number;
        reviews: any[];
        __v: number;
        createdAt?: string;
        updatedAt?: string;
      };
      _id: string;
    }[];
    paymentMethod: string;
    itemsPrice: number;
    taxAmount: number;
    shippingAmount: number;
    totalAmount: number;
    orderStatus: string;
    createdAt: string;
    updatedAt: string;
  };
  convertDateCol: (dateInput: string) => string;
};

const DrawerOrder = ({
  onCloseDrawer,
  openDrawer,
  convertDateCol,
  dataOrderView,
}: IDrawerProps) => {
  console.log("check dataOrderView ", dataOrderView);
  return (
    <Drawer
      title="Order Details"
      width={800}
      onClose={onCloseDrawer}
      open={openDrawer}
    >
      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label="Order ID" span={2}>
          {dataOrderView._id}
        </Descriptions.Item>
        <Descriptions.Item label="Order Status">
          {dataOrderView.orderStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Order Date">
          {convertDateCol(dataOrderView.createdAt.toString())}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="Shipping Info"
        bordered
        column={2}
        size="small"
        className="mt-4"
      >
        <Descriptions.Item label="Name">
          {dataOrderView.user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {dataOrderView.shippingInfo.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {dataOrderView.shippingInfo.address}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="Payment Info"
        bordered
        column={2}
        size="small"
        className="mt-4"
      >
        <Descriptions.Item label="Status">
          {dataOrderView.paymentInfo.status}
        </Descriptions.Item>
        <Descriptions.Item label="Method">
          {dataOrderView.paymentMethod}
        </Descriptions.Item>
        <Descriptions.Item label="Amount Paid" span={2}>
          {dataOrderView.totalAmount}
        </Descriptions.Item>
      </Descriptions>

      <div className="text-[17px] font-medium mt-5">Order Items</div>
      {dataOrderView.orderItems.length !== 0 &&
        dataOrderView.orderItems.map((order) => (
          <div className="order-item my-5" key={order._id}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Image Product">
                <Image
                  src={order.product.images[0].url}
                  width={50}
                  height={50}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Name Product">
                {order.name}
              </Descriptions.Item>
              <Descriptions.Item label="Price">{order.price}</Descriptions.Item>
              <Descriptions.Item label="Quantity">
                {order.quantity} Piece(s)
              </Descriptions.Item>
            </Descriptions>
          </div>
        ))}
    </Drawer>
  );
};

export default DrawerOrder;
