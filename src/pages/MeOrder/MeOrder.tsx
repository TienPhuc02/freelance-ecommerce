import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doClearCart } from "../../redux/features/order/orderSlice";
import TableOrder from "./TableOrder";
import "./MeOrder.css";
const MeOrder = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doClearCart());
  }, []);
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <div className="my-5">MeOrder</div>
      <TableOrder />
    </div>
  );
};

export default MeOrder;
