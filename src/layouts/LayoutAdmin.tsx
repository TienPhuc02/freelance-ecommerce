import React, { useEffect, useState } from "react";
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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { APIAccount, APISignOut } from "../services/api";
import {
  getAccountRedux,
  logOutUserRedux,
} from "../redux/features/account/accountSlice";

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await APIAccount();
    console.log("res account ", res);
    if (res && res.data) {
      dispatch(getAccountRedux(res.data.user));
    }
  };
  const handleLogout = async () => {
    const res = await APISignOut();
    if (res && res.data) {
      navigate("/");
      dispatch(logOutUserRedux());
    }
  };
  useEffect(() => {
    getAccount();
  }, []);
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
          <div className="flex justify-between">
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

            <div className="pr-6 flex gap-4 items-center">
              <Button onClick={() => navigate("/")} type="text">
                Home
              </Button>
              <Button onClick={handleLogout} type="text">
                Logout
              </Button>
            </div>
          </div>
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
