import { Button, Card, Checkbox, notification } from "antd";
import { useState } from "react";
import { IDataCreateOrder } from "../../pages/CheckOut/CheckOut";
import { APICreateOrderCOD, APIPaymentStripeSession } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

interface IPropsPayment {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  dataOrder: IDataCreateOrder;
  setDataOrder: React.Dispatch<React.SetStateAction<IDataCreateOrder>>;
}

const stripePromise = loadStripe(
  "pk_test_51P4kkwGAY3OnCt5BaYSnIbfjeUeehkQVcN5lXhrV9EKtbEy4nsnNWSv3Shhz2EKqzj9QDR9cLJymmIqhMroImhBZ00LdCMYzOW"
);

const Payment = ({ dataOrder, setDataOrder }: IPropsPayment) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const navigate = useNavigate();

  const onChange = (value: string) => {
    setSelectedValue(value);
    setDataOrder((prevDataOrder) => ({
      ...prevDataOrder,
      paymentMethod: value,
      paymentInfo: {
        status: "Not Paid",
      },
    }));
  };

  const handleSubmitCreateOrder = async () => {
    if (selectedValue === "COD") {
      // Xử lý Thanh toán khi giao hàng
      const res = await APICreateOrderCOD(dataOrder);
      console.log(res);
      navigate("/me/orders");
    } else if (selectedValue === "Card") {
      // Xử lý thanh toán Stripe
      const response = await APIPaymentStripeSession(dataOrder);

      if (!response) {
        notification.error({
          message: "Lỗi",
          description: "Không thể tạo phiên thanh toán của Stripe.",
        });
        return;
      }

      const { sessionId } = response; // sessionId trả về từ APIPaymentStripeSession

      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
        //https://docs.stripe.com/testing#cards
        //4242424242424242
        if (error) {
          console.error(
            "Lỗi khi chuyển hướng đến trang thanh toán của Stripe:",
            error
          );
        }
      }
    }
  };

  return (
    <div className="max-w-[400px] mx-auto mt-5">
      <Card style={{ width: 400 }}>
        <p className="text-2xl mb-3">Select Payment method</p>
        <div className="flex flex-col gap-5">
          <Checkbox
            checked={selectedValue === "COD"}
            onChange={() => onChange("COD")}
          >
            Cash on Delivery
          </Checkbox>
          <Checkbox
            checked={selectedValue === "Card"}
            onChange={() => onChange("Card")}
          >
            Card - VISA, MasterCard
          </Checkbox>
          <div className="button submit" onClick={handleSubmitCreateOrder}>
            <Button type="primary" className="bg-[#167fff] w-full">
              Payment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
