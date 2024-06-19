import { Drawer, Descriptions, Image } from "antd";
import React from "react";

type PropsDrawer = {
  onCloseDrawer: () => void;
  openDrawer: boolean;
  dataProductView: {
    id: string;
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: { url: string }[];
    category: string;
    stock: number;
    reviews: never[];
    createdAt: string;
    updatedAt: string;
  };
  convertDateCol: (dateInput: string) => string;
};

const DrawerProduct = ({
  onCloseDrawer,
  openDrawer,
  dataProductView,
  convertDateCol,
}: PropsDrawer) => {
  console.log("check dataProductView>>", dataProductView);

  return (
    <Drawer
      title="Product Details"
      width={600}
      onClose={onCloseDrawer}
      open={openDrawer}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{dataProductView.id}</Descriptions.Item>
        <Descriptions.Item label="Name">
          {dataProductView.name}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {dataProductView.price}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {dataProductView.description}
        </Descriptions.Item>
        <Descriptions.Item label="Ratings">
          {dataProductView.ratings}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {dataProductView.category}
        </Descriptions.Item>
        <Descriptions.Item label="Stock">
          {dataProductView.stock}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {convertDateCol(dataProductView.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {convertDateCol(dataProductView.updatedAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Images">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {dataProductView.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`image-${index}`}
                width={80}
                height={80}
                style={{ objectFit: "cover", marginRight: 8, marginBottom: 8 }}
              />
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default DrawerProduct;
