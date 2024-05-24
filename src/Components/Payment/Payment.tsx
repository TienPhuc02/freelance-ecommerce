import { Button, Card, Checkbox } from "antd";
import { useState } from "react";
import { IDataCreateOrder } from "../../pages/CheckOut/CheckOut";
import { APICreateOrderCOD } from "../../services/api";
import { useNavigate } from "react-router-dom";
interface IPropsPayment {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  dataOrder: IDataCreateOrder;
  setDataOrder: React.Dispatch<React.SetStateAction<IDataCreateOrder>>;
}
const Payment = ({ dataOrder, setDataOrder }: IPropsPayment) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const navigate = useNavigate();
  console.log(selectedValue);
  const onChange = (value: any) => {
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
    console.log("check data order ", dataOrder);
    const res = await APICreateOrderCOD(dataOrder);
    console.log(res);
    navigate("/me/orders");
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
            Card-VISA,MasterCard
          </Checkbox>
          <div className="button submit" onClick={handleSubmitCreateOrder}>
            <Button type="primary" className="bg-[#167fff] w-full">
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Payment;
