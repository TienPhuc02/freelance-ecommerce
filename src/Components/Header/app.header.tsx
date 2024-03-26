import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Input } from "antd";
import React from "react";

const HeaderComponent = () => {
  return (
    <div className="h-[60px] flex items-center">
      <a className="header-logo flex max-w-[300px] h-full items-center pl-[40px]">
        <img
          className="h-[32px] w-[32px] mr-[12px]"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
        />
        <span className="text-[18px] font-semibold min-w-[90px] leading-8">
          Shop IT
        </span>
      </a>
      <div className="input-search-header flex ">
        <SearchOutlined className="text-[#cccccc] text-[20px]" />
        <Input
          placeholder="Nhập tìm kiếm sản phẩm ở đây."
          variant="borderless"
          className="min-w-[1000px]"
        />
      </div>
      <div className="cart-header cursor-pointer w-[100px]">
        <Badge count={5}>
          <ShoppingCartOutlined className="text-[32px] text-black opacity-50 font-extralight" />
        </Badge>
      </div>
      <div className="auth-header flex gap-2">
        <Button>Đăng Nhập</Button>
        <Button>Đăng Ký</Button>
      </div>
    </div>
  );
};

export default HeaderComponent;
