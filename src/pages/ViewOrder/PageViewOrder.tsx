import React from "react";
import OrderListView from "../../Components/ViewOrder/OrderListView";
import OrderSummary from "../../Components/ViewOrder/OrderSummary";

const PageViewOrder = () => {
  return (
    <div className="flex h-[600px] max-w-[1200px] mx-auto pt-6">
      <OrderListView />
      <OrderSummary />
    </div>
  );
};

export default PageViewOrder;
