import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIMeOrderItemsDetail } from "../../services/api";
import { Button, Card, Descriptions, DescriptionsProps, Divider } from "antd";
import { convertDateCol } from "../../utils/func.customize.date";
import TableInvoiceMeOrder from "./TableInvoiceMeOrder";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const InvoiceMeOrder = () => {
  const { id } = useParams<{ id: string }>();
  const [meOrderDetails, setMeOrderDetail] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const RefOrderInvoice = useRef(null);
  const GetAPIMeOrderItemsDetail = async (orderId: string) => {
    try {
      const res = await APIMeOrderItemsDetail(orderId);
      if (res && res.data) {
        setMeOrderDetail(res.data.order);
        setOrderItems(res.data.order.orderItems);
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

  const items: DescriptionsProps["items"] = meOrderDetails
    ? [
        {
          key: "1",
          label: "Name",
          children: meOrderDetails.user.name,
        },
        {
          key: "2",
          label: "Email",
          children: meOrderDetails.user.email,
        },
        {
          key: "3",
          label: "Phone",
          children: meOrderDetails.shippingInfo.phoneNumber,
        },
        {
          key: "4",
          label: "Address",
          children: meOrderDetails.shippingInfo.address,
        },
        {
          key: "5",
          label: "Date",
          children: convertDateCol(meOrderDetails.createdAt),
        },
        {
          key: "6",
          label: "Status",
          children: meOrderDetails.orderStatus,
        },
        {
          key: "7",
          label: "Shop",
          children: "Shop IT",
        },
        {
          key: "8",
          label: "Shop Address",
          children: "Hồng Thái, Lạc Hồng, Văn Lâm, Hưng Yên",
        },
        {
          key: "9",
          label: "Phone Shop",
          children: "1234445557",
        },
        {
          key: "10",
          label: "Link Shop",
          children: (
            <Link to={`https://github.com/TienPhuc02`}>
              https://github.com/TienPhuc02
            </Link>
          ),
        },
      ]
    : [];
  const downloadPdf = async () => {
    const flowElement = RefOrderInvoice.current!;
    const canvas = await html2canvas(flowElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    let pdfImgWidth, pdfImgHeight;
    if (imgWidth / imgHeight > pageWidth / pageHeight) {
      pdfImgWidth = pageWidth;
      pdfImgHeight = (imgHeight * pageWidth) / imgWidth;
    } else {
      pdfImgHeight = pageHeight;
      pdfImgWidth = (imgWidth * pageHeight) / imgHeight;
    }
    const xOffset = (pageWidth - pdfImgWidth) / 2;
    const yOffset = (pageHeight - pdfImgHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, pdfImgWidth, pdfImgHeight);
    pdf.save("order-invoice.pdf");
  };
  return (
    <div className="min-h-[610px] pt-3 max-w-[1000px] mx-auto">
      <div className="button-invoice-order my-3 max-w-[500px] mx-auto">
        <Button type="primary" block onClick={() => downloadPdf()}>
          Download Invoice
        </Button>
      </div>
      <div className="order-invoice" ref={RefOrderInvoice}>
        <Card>
          <div className="logo-invoice flex justify-center items-center flex-col">
            <img
              className="h-[100px] w-[100px] mr-[12px]"
              src="/logo_invoice.svg"
              alt="Shop Logo"
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
            {meOrderDetails && (
              <Descriptions
                items={items}
                layout="horizontal"
                labelStyle={{ paddingLeft: "5px", paddingRight: "5px" }}
              />
            )}
          </div>
          <div className="table-invoice-me-order">
            {orderItems.length > 0 && (
              <TableInvoiceMeOrder
                orderItems={orderItems}
                meOrderDetails={meOrderDetails}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceMeOrder;
