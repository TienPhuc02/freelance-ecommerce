import { Button, Card, Divider } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
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
  const handleCheckOut = () => {
    navigate("/check-out");
  };
  return (
    <div className="w-[300px] rounded-lg shadow-md h-[180px] mt-5">
      <Card className="">
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
        <Divider className="my-2" />
        <Button
          onClick={handleCheckOut}
          type="primary"
          className="bg-[#167fff] w-full"
        >
          Check Out
        </Button>
      </Card>
    </div>
  );
};

export default OrderSummary;
