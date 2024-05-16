import { Steps } from "antd";
import { useState } from "react";
import ShippingInfo from "../../Components/ShippingInfo/ShippingInfo";
import ConfirmOrder from "../../Components/ConfirmOrder/ConfirmOrder";
import Payment from "../../Components/Payment/Payment";

const description = "This is a description.";
const CheckOutPage = () => {
  const [currentStep, setCurrentStep] = useState(2);
  return (
    <div className="min-h-[600px] pt-5 max-w-[1000px] mx-auto">
      <Steps
        current={currentStep}
        items={[
          {
            title: "Finished",
            description,
          },
          {
            title: "In Progress",
            description,
            subTitle: "Left 00:00:08",
          },
          {
            title: "Waiting",
            description,
          },
        ]}
      />
      {currentStep === 0 ? (
        <>
          <ShippingInfo />
        </>
      ) : currentStep === 1 ? (
        <>
          <ConfirmOrder />
        </>
      ) : currentStep === 2 ? (
        <>
          <Payment />
        </>
      ) : null}
    </div>
  );
};
export default CheckOutPage;
