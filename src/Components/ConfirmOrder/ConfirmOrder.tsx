import { Button, Card, Divider } from "antd";
import { IDataCreateOrder } from "../../pages/CheckOut/CheckOut";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface IPropsConfirmOrder {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  dataOrder: IDataCreateOrder;
  setDataOrder: React.Dispatch<React.SetStateAction<IDataCreateOrder>>;
}

const ConfirmOrder = ({
  setCurrentStep,
  dataOrder,
  setDataOrder,
}: IPropsConfirmOrder) => {
  const priceShipping = 0;
  const priceTax = 100;

  const user = useSelector((state: any) => state.account);
  const cart = useSelector((state: any) => state.order.cart);

  useEffect(() => {
    const calculateSubtotal = () => {
      return cart.reduce(
        (acc: number, item: any) => acc + item.quantity * item.detail.price,
        0
      );
    };
    const mapCartToOrderItems = () => {
      return cart.map((item: any) => ({
        name: item.detail.name,
        quantity: item.quantity,
        image: item.detail.images[0].url,
        price: item.detail.price,
        product: item.id,
      }));
    };
    const orderItems = mapCartToOrderItems();
    const subtotal = calculateSubtotal();

    setDataOrder((prevDataOrder) => ({
      ...prevDataOrder,
      itemsPrice: subtotal,
      shippingAmount: priceShipping,
      taxAmount: priceTax,
      totalAmount: parseFloat((subtotal + priceShipping + priceTax).toFixed(2)),
      orderItems: orderItems,
    }));
  }, [cart, priceShipping, priceTax, setDataOrder]);
  console.log(dataOrder);
  return (
    <>
      <div className="confirm-order-container flex gap-3">
        <div className="shipping-info flex flex-col mt-3 gap-3 min-w-[700px]">
          <p className="text-2xl">Shipping info</p>
          <p>Name : {user.name}</p>
          <p>Phone : {dataOrder.shippingInfo.phoneNumber}</p>
          <p>Address : {dataOrder.shippingInfo.address}</p>
          <Divider />
          <p className="text-2xl">Your Cart Items</p>
          <Divider />
          <div className="list-product-order flex flex-col gap-4">
            {cart &&
              cart.length > 0 &&
              cart.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <img
                    src={`${item?.detail?.images[0]?.url}`}
                    className="w-[50px] h-[50px]"
                    alt={item.detail.name}
                  />
                  <div>{item.detail.name}</div>
                  <div>
                    {item.quantity} x ${item?.detail?.price} = $
                    {item.quantity * item?.detail?.price}
                  </div>
                </div>
              ))}
          </div>
          <Divider />
        </div>
        <div className="card-summary-order w-[300px] rounded-lg shadow-md h-[180px] mt-5">
          <Card className="">
            <div className="text-xl">Order Summary :</div>
            <Divider />
            <div className="flex justify-between mb-5">
              <span>Subtotal :</span>
              <span>${dataOrder.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span>Shipping :</span>
              <span>${priceShipping}</span>
            </div>
            <div className="total-price flex justify-between">
              <span>Tax :</span>
              <span>${priceTax}</span>
            </div>
            <Divider />
            <div className="total-price flex justify-between mb-4">
              <span>Total :</span>
              <span>${dataOrder.totalAmount.toFixed(2)}</span>
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              type="primary"
              className="bg-[#167fff] w-full"
            >
              Continue
            </Button>
          </Card>
        </div>
      </div>
      <Button type="text" onClick={() => setCurrentStep(0)}>
        Go Back
      </Button>
    </>
  );
};

export default ConfirmOrder;
