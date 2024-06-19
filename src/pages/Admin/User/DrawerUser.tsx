import React from "react";
import { Drawer, Descriptions, Image } from "antd";

type PropsDrawer = {
  onCloseDrawer: () => void;
  openDrawer: boolean;
  dataUserView: {
    id: string;
    name: string;
    email: string;
    role: string;
    url: string;
    createdAt: string;
    resetPasswordExpire: string;
  };
  convertDateCol: (dateInput: string) => string;
};

const DrawerDetailUser = ({
  onCloseDrawer,
  openDrawer,
  dataUserView,
  convertDateCol,
}: PropsDrawer) => {
  const items = [
    {
      key: "1",
      label: "ID",
      children: dataUserView.id,
      span: 3,
    },
    {
      key: "2",
      label: "Name",
      children: dataUserView.name,
      span: 3,
    },
    {
      key: "3",
      label: "Email",
      children: dataUserView.email,
      span: 3,
    },
    {
      key: "4",
      label: "Role",
      children: dataUserView.role,
      span: 3,
    },
    {
      key: "5",
      label: "Created At",
      children: convertDateCol(dataUserView.createdAt),
      span: 3,
    },
    {
      key: "6",
      label: "Reset Password Expire",
      children: convertDateCol(dataUserView.resetPasswordExpire),
      span: 3,
    },
    {
      key: "7",
      label: "Avatar",
      children:
        dataUserView.url !== "" ? (
          <Image
            width={150}
            height={150}
            src={`${dataUserView.url}`}
            alt="avatar user"
          />
        ) : (
          "No avatar"
        ),
      span: 3,
    },
  ];

  return (
    <Drawer
      title="User Details"
      width={600}
      onClose={onCloseDrawer}
      open={openDrawer}
    >
      <Descriptions bordered column={1} items={items} />
    </Drawer>
  );
};

export default DrawerDetailUser;
