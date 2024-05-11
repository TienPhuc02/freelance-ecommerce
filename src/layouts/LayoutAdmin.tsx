import React, { useState } from "react";
import "./LayoutAdmin.css";
import {
  CopyOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical flex justify-center items-center bg-[#167fff]">
          Admin
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link to={"/admin"}>
                  <UserOutlined />
                </Link>
              ),
              label: "DashBoard",
            },
            {
              key: "2",
              icon: (
                <Link to={"/admin/user"}>
                  <VideoCameraOutlined />
                </Link>
              ),
              label: "User",
            },
            {
              key: "3",
              icon: (
                <Link to={"/admin/product"}>
                  <UploadOutlined />
                </Link>
              ),
              label: "Product",
            },
            {
              key: "4",
              icon: (
                <Link to={"/admin/order"}>
                  <CopyOutlined />
                </Link>
              ),
              label: "Order",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "75vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
