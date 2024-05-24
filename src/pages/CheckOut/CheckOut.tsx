import { Steps } from "antd";
import { useState } from "react";
import ShippingInfo from "../../Components/ShippingInfo/ShippingInfo";
import ConfirmOrder from "../../Components/ConfirmOrder/ConfirmOrder";
import Payment from "../../Components/Payment/Payment";

export interface IDataCreateOrder {
  shippingInfo: {
    address: string;
    city: string;
    phoneNumber: string;
    zipCode: string;
    country: string;
  };
  orderItems: [
    {
      name: string;
      quantity: number;
      image: string;
      price: string;
      product: string;
    }
  ];
  paymentMethod: string;
  paymentInfo?: {
    status: string;
  };
  itemsPrice: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
}
const CheckOutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataOrder, setDataOrder] = useState<IDataCreateOrder>({
    shippingInfo: {
      address: "",
      city: "",
      phoneNumber: "",
      zipCode: "",
      country: "",
    },
    orderItems: [
      {
        name: "",
        quantity: 0,
        image: "",
        price: "",
        product: "",
      },
    ],
    paymentMethod: "",
    paymentInfo: {
      status: "",
    },
    itemsPrice: 0,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: 0,
  });
  console.log(dataOrder);
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <Steps
        current={currentStep}
        items={[
          {
            title: "Shipping Info",
          },
          {
            title: "Confirm Order",
          },
          {
            title: "Payment",
          },
        ]}
      />
      {currentStep === 0 ? (
        <>
          <ShippingInfo
            setDataOrder={setDataOrder}
            dataOrder={dataOrder}
            setCurrentStep={setCurrentStep}
          />
        </>
      ) : currentStep === 1 ? (
        <>
          <ConfirmOrder
            setCurrentStep={setCurrentStep}
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
          />
        </>
      ) : currentStep === 2 ? (
        <>
          <Payment
            setDataOrder={setDataOrder}
            dataOrder={dataOrder}
            setCurrentStep={setCurrentStep}
          />
        </>
      ) : null}
    </div>
  );
};
export default CheckOutPage;
