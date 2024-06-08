import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIMeOrderItemsDetail } from "../../services/api";
import { Button, Card, Descriptions, DescriptionsProps, Divider } from "antd";
import { convertDateCol } from "../../utils/func.customize.date";

const InvoiceMeOrder = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [meOrderDetails, setMeOrderDetail] = useState<Order | null>(null);
  const GetAPIMeOrderItemsDetail = async (orderId: string) => {
    try {
      const res = await APIMeOrderItemsDetail(orderId);
      if (res && res.data) {
        setMeOrderDetail(res.data.order);
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      GetAPIMeOrderItemsDetail(id);
    }
  }, [id]);
  console.log("check meOrderDetails>>>", meOrderDetails);
  const items: DescriptionsProps["items"] = meOrderDetails
    ? [
        {
          key: "1",
          label: "Name",
          children: meOrderDetails?.user.name,
        },
        {
          key: "2",
          label: "Email",
          children: meOrderDetails?.user.email,
        },
        {
          key: "3",
          label: "Phone",
          children: meOrderDetails?.shippingInfo.phoneNumber,
        },
        {
          key: "4",
          label: "Address",
          children: meOrderDetails?.shippingInfo.address,
        },
        {
          key: "5",
          label: "Date",
          children: convertDateCol(meOrderDetails?.createdAt),
        },
        {
          key: "5",
          label: "Status",
          children: meOrderDetails.orderStatus,
        },
        {
          key: "6",
          label: "Shop",
          children: "Shop IT",
        },
        {
          key: "6",
          label: "Shop Address",
          children: "Hồng Thái,Lạc Hồng,Văn Lâm,Hưng Yên",
        },
        {
          key: "7",
          label: "Phone Shop",
          children: "1234445557",
        },
        {
          key: "8",
          label: "Link Shop",
          children: (
            <Link to={`https://github.com/TienPhuc02`}>
              https://github.com/TienPhuc02
            </Link>
          ),
        },
      ]
    : [];
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <div className="button-invoice-order my-3 max-w-[500px] mx-auto">
        <Button type="primary" block>
          Download Invoice
        </Button>
      </div>
      <div className="order-invoice">
        <Card>
          <div className="logo-invoice flex justify-center items-center flex-col">
            <img
              className="h-[100px] w-[100px] mr-[12px]"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
            />
            <div className="title-shop mt-3 text-[25px] font-semibold">
              SHOP IT
            </div>
          </div>
          <div className="invoice-header mt-6">
            <Divider className="my-[0px]" />
            <div className="text-center text-[20px] font-normal bg-[#ccc]">
              INVOICE #{id}
            </div>
            <Divider className="my-[0px]" />
          </div>
          <div className="info-user info-shop mt-6">
            {meOrderDetails !== null && (
              <Descriptions
                items={items}
                layout="horizontal"
                labelStyle={{ paddingLeft: "5px", paddingRight: "5px" }}
              />
            )}
          </div>
          <div className="table-invoice-me-order">
            
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceMeOrder;
