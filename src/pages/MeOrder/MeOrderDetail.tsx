import { Button, Descriptions, Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { APIMeOrderItemsDetail } from "../../services/api";
import { useEffect, useState } from "react";
import { convertDateCol } from "../../utils/func.customize.date";

const MeOrderDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  console.log(id);
  const navigate = useNavigate();
  const [meOrderDetails, setMeOrderDetail] = useState<Order | null>(null);
  const GetAPIMeOrderItemsDetail = async () => {
    const res = await APIMeOrderItemsDetail(id as string);
    console.log("check res order detail", res);
    if ((res as any) && res.data) {
      setMeOrderDetail(res.data.order);
    }
  };

  useEffect(() => {
    GetAPIMeOrderItemsDetail();
  }, []);
  const handleRedirectInvoiceOrder = () => {
    navigate(`/invoice/orders/${id}`);
  };
  console.log("check order details >>", meOrderDetails);
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <div className="header-item-order-detail flex items-center justify-between my-3">
        <div>Your Order detail</div>
        <Button
          type="primary"
          onClick={() => {
            handleRedirectInvoiceOrder();
          }}
        >
          Invoice
        </Button>
      </div>
      <div className="general-info">
        {meOrderDetails && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">
              {meOrderDetails?._id}
            </Descriptions.Item>
            <Descriptions.Item label="Status Order">
              {meOrderDetails?.orderStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {convertDateCol(meOrderDetails?.createdAt.toString())}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      <div className="shipping-info mt-5">
        <Descriptions title={"Shipping Info"} bordered column={1}>
          <Descriptions.Item label="Name">
            {meOrderDetails?.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {meOrderDetails?.shippingInfo.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {meOrderDetails?.shippingInfo.address}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="shipping-info my-5">
        <Descriptions title={"Payment Info"} bordered column={1}>
          <Descriptions.Item label="Status">
            {meOrderDetails?.paymentInfo.status}
          </Descriptions.Item>
          <Descriptions.Item label="Method">
            {meOrderDetails?.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Stripe ID">null</Descriptions.Item>
          <Descriptions.Item label="Amound Paid">
            {meOrderDetails?.totalAmount}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="text-[17px] font-medium">Order Items</div>
      {meOrderDetails?.orderItems.length !== 0 &&
        meOrderDetails?.orderItems.map((order) => {
          return (
            <>
              <div className="order-item my-5">
                <Descriptions bordered>
                  <Descriptions.Item label="Image Product">
                    <Image
                      src={order.product.images[0].url}
                      width={50}
                      height={50}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Name Product">
                    {order.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {order.price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Quantity">
                    {order.quantity} Piece(s)
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default MeOrderDetail;
