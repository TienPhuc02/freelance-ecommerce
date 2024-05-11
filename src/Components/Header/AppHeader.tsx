import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Form, Input, Popover, Select } from "antd";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import "./CssAppHesader.css";
import ModalProfile from "../ModalProfile/ModalProfile";
import { APISignOut } from "../../services/api";
import { useDispatch } from "react-redux";
import { logOutUserRedux } from "../../redux/features/account/accountSlice";
import {
  SELECT_HEADER_ADMIN,
  SELECT_HEADER_USER,
} from "../../constant/main.constant";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState<string>("");
  const arrowAtCenter = false;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderList = useSelector((state: any) => state?.order?.cart);
  const quantityCart = useSelector((state: any) => state?.order?.cart?.length);
  const nameUser = useSelector((state: any) => state?.account?.name);
  const user = useSelector((state: any) => state?.account);
  const handleRedirectLogin = () => {
    navigate("/login");
  };
  const handleRedirectSignUp = () => {
    navigate("/signup");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };
  const debouncedSearchTerm = useDebounce(valueInput, 1000);
  console.log(debouncedSearchTerm);
  const handleSearch = () => {
    const searchData = form.getFieldsValue();
    console.log("Search Data:", searchData);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      navigate(`/keyword=${valueInput}`);
    }
  };
  const showModalProfile = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleViewOrder = () => {
    navigate("/view-order");
  };
  const handleLogout = async () => {
    const res = await APISignOut();
    if (res && res.data) {
      dispatch(logOutUserRedux());
    }
  };
  const handleChangeSelect = async (value: string) => {
    console.log(`selected ${value}`);
    switch (value) {
      case "Profile":
        showModalProfile();
        break;
      case "Order":
        navigate("/view-order");
        break;
      case "SignOut":
        handleLogout();
        break;
      case "DashBoard":
        navigate("/admin");
        break;
    }
  };
  const text = <span className="text-center">Sản phẩm mới thêm</span>;
  const content = (
    <>
      <div>
        {orderList &&
          orderList.length > 0 &&
          orderList.map((item: any, index: any) => {
            const imageUrl = item?.detail?.images[0]?.url;
            return imageUrl ? (
              <div key={index} style={{ display: "flex", marginTop: "10px" }}>
                <img
                  className="block w-[50px] h-[50px] mr-3"
                  src={imageUrl}
                  alt=""
                />
                <span>{item.detail.mainText}</span>
                <div className="flex flex-col">
                  <div style={{ marginLeft: "10px" }}>
                    {item.detail.price} $
                  </div>
                  <div className="text-[15px]">{item.detail.name}</div>
                </div>
              </div>
            ) : null;
          })}
      </div>
      <div className="text-center">
        <button
          className="bg-[#4096ff] rounded-[10px] py-[5px] px-[15px] text-white text-[13px]"
          onClick={() => handleViewOrder()}
        >
          Xem giỏ hàng
        </button>
      </div>
    </>
  );
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        pointAtCenter: true,
      };
  }, [arrowAtCenter]);
  return (
    <div className="h-[60px] flex items-center border-b shadow-sm">
      <div className="header-logo flex min-w-[500px] h-full items-center pl-[40px] cursor-pointer">
        <Link to={"/"} className="flex">
          <img
            className="h-[32px] w-[32px] mr-[12px]"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt=""
          />
          <span className="text-[18px] font-semibold min-w-[90px] leading-8 ">
            Shop IT
          </span>
        </Link>
      </div>
      <div className="input-search-header min-w-[300px]">
        <Form form={form} className="flex items-center">
          <Form.Item>
            <SearchOutlined
              type="submit"
              onClick={handleSearch}
              className="text-[#cccccc] text-[20px]"
            />
          </Form.Item>
          <Form.Item name={"input-search"}>
            <Input
              name="inputValue"
              value={valueInput}
              onChange={handleInputChange}
              placeholder="Nhập tìm kiếm sản phẩm ở đây."
              onKeyDown={handleKeyDown}
              variant="borderless"
              className="min-w-[700px]"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="cart-header cursor-pointer w-[100px]">
        <Popover
          placement="bottomRight"
          title={text}
          content={content}
          arrow={mergedArrow}
        >
          <Badge count={quantityCart}>
            <ShoppingCartOutlined
              onClick={() => handleViewOrder()}
              className="text-[32px] text-black opacity-50 font-extralight"
            />
          </Badge>
        </Popover>
      </div>
      {nameUser ? (
        <>
          <Avatar size={32} icon={<img src={`${user.avatar.url}`} />} />
          {user.role == "admin" ? (
            <Select
              onChange={handleChangeSelect}
              defaultValue={`Hi ${nameUser}`}
              style={{ width: 120 }}
              allowClear
              value={`Hi ${nameUser}`}
              options={SELECT_HEADER_ADMIN}
            />
          ) : (
            <Select
              onChange={handleChangeSelect}
              defaultValue={`Hi ${nameUser}`}
              style={{ width: 120 }}
              allowClear
              value={`Hi ${nameUser}`}
              options={SELECT_HEADER_USER}
            />
          )}
        </>
      ) : (
        <div className="auth-header flex gap-2">
          <Button
            onClick={handleRedirectLogin}
            type="primary"
            className="bg-[#167fff]"
          >
            Log In
          </Button>
          <Button onClick={handleRedirectSignUp}>Sign Up</Button>
        </div>
      )}

      <ModalProfile
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default HeaderComponent;
