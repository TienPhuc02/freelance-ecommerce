import { Button, Empty, InputNumber } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  doDeleteItemCartAction,
  doUpdateOrder,
} from "../../redux/features/order/orderSlice";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const OrderListView = () => {
  const dispatch = useDispatch();
  const listProductOrder = useSelector((state: any) => state.order.cart);
  console.log(listProductOrder);
  const onChangeOrderProduct = (product: any, quantity: any) => {
    console.log("item>> check", product);
    console.log("changed", quantity);
    dispatch(doUpdateOrder({ quantity, product, _id: product.id }));
  };
  const IncreaseInput = (product: any, quantity: any) => {
    if (
      !isNaN(quantity) &&
      quantity !== null &&
      quantity < product.detail.stock
    ) {
      dispatch(
        doUpdateOrder({ quantity: quantity + 1, product, _id: product.id })
      );
    }
  };

  const DecreaseInput = (product: any, quantity: any) => {
    if (!isNaN(quantity) && quantity !== null && quantity > 1) {
      dispatch(
        doUpdateOrder({ quantity: quantity - 1, product, _id: product.id })
      );
    }
  };
  const deleteProductOrder = (product: any) => {
    dispatch(doDeleteItemCartAction({ _id: product.id }));
  };
  return (
    <div className="border border-red-400 w-[900px] mr-[10px]">
      {listProductOrder.length !== 0 ? (
        listProductOrder.map((product: any) => {
          return (
            <div className="image-product flex items-center" key={product.id}>
              <img
                src={product.detail.images[0].url}
                alt=""
                className="w-[100px] h-[100px]"
              />
              <div className="name-product mr-4">{product.detail.name}</div>
              <div className="form-input-quantity-order flex gap-2">
                <Button
                  onClick={() => DecreaseInput(product, product.quantity)}
                  className="flex items-center justify-center"
                >
                  <MinusOutlined />
                </Button>
                <InputNumber
                  min={1}
                  defaultValue={product.quantity}
                  onChange={(value) => onChangeOrderProduct(product, value)}
                  value={product.quantity}
                />
                <Button
                  onClick={() => IncreaseInput(product, product.quantity)}
                  className="flex items-center justify-center mr-4"
                >
                  <PlusOutlined />
                </Button>
              </div>
              <div
                className="delete-order-product text-[20px] cursor-pointer"
                onClick={() => deleteProductOrder(product)}
              >
                <DeleteOutlined />
              </div>
            </div>
          );
        })
      ) : (
        <>
          <Empty />
        </>
      )}
    </div>
  );
};

export default OrderListView;
