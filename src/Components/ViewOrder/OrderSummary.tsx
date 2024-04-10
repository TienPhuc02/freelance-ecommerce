import { Card, Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const TotalProductOrderUnit = useSelector((state: any) =>
    state.order.cart.reduce(
      (total: any, product: any) => total + product.quantity,
      0
    )
  );
  const TotalPriceProductOrder = useSelector((state: any) =>
    state.order.cart
      .reduce(
        (total: any, product: any) =>
          total + product.quantity * product.detail.price,
        0
      )
      .toFixed(2)
  );
  return (
    <div className="border border-green-400 w-[300px]">
      <Card className="w-[300px] h-[250px]">
        <div>Order Summary : </div>
        <Divider />
        <div className="number-item flex justify-between mb-5">
          <span>Units : </span>
          <span>{TotalProductOrderUnit} (Units)</span>
        </div>
        <div className="total-price flex justify-between">
          <span>Total Price : </span>
          <span>${TotalPriceProductOrder}</span>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummary;
