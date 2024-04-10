import { InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  doProductAction,
  doUpdateOrder,
} from "../../redux/features/order/orderSlice";

const OrderListView = () => {
  const dispatch = useDispatch();
  const listProductOrder = useSelector((state: any) => state.order.cart);
  console.log(listProductOrder);
  // const [quantityOrderProduct, setQuantityOrderProduct] = useState<number>();
  const onChangeOrderProduct = (product: any, quantity: any) => {
    console.log("item>> check", product);
    console.log("changed", quantity);
    // setQuantityOrderProduct(quantity);
    dispatch(doUpdateOrder({ quantity, product, _id: product.id }));
  };
  return (
    <div className="border border-red-400 w-[900px] mr-[10px]">
      {listProductOrder.length !== 0 &&
        listProductOrder.map((product: any) => {
          return (
            <div className="image-product flex items-center" key={product.id}>
              <img
                src={product.detail.images[0].url}
                alt=""
                className="w-[100px] h-[100px]"
              />
              <div className="name-product mr-4">{product.detail.name}</div>
              <div className="form-input-quantity-order">
                <InputNumber
                  min={1}
                  defaultValue={product.quantity}
                  onChange={(value) => onChangeOrderProduct(product, value)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderListView;
