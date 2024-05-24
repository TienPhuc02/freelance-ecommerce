import { Button, Card, Checkbox } from "antd";
import { useState } from "react";
import { IDataCreateOrder } from "../../pages/CheckOut/CheckOut";
interface IPropsPayment {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  dataOrder: IDataCreateOrder;
  setDataOrder: React.Dispatch<React.SetStateAction<IDataCreateOrder>>;
}
const Payment = ({
  dataOrder,
  setDataOrder,
}: IPropsPayment) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
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
  const handleSubmitCreateOrder=()=>
  console.log("check data order ", dataOrder);
  return (
    <div className="max-w-[400px] mx-auto mt-5">
      <Card style={{ width: 400 }}>
        <p className="text-2xl mb-3">Select Payment method</p>
        <div className="flex flex-col">
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
        </div>
        <div className="button submit">
          <Button
            type="primary"
            className="bg-[#167fff] w-full"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Payment;
