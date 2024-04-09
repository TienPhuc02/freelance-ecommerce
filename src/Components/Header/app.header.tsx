import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Form, Input, Popover } from "antd";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState<string>("");
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const [form] = Form.useForm();
  const orderList = useSelector((state: any) => state?.order?.cart);
  const quantityCart = useSelector((state: any) => state?.order?.cart?.length);
  console.log(quantityCart);
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
                  style={{ display: "block", width: "50px", height: "50px" }}
                  src={imageUrl}
                  alt=""
                />
                <span>{item.detail.mainText}</span>
                <span style={{ color: "#EE4C2D", marginLeft: "10px" }}>
                  {item.detail.price} $
                </span>
              </div>
            ) : null;
          })}
      </div>
      <div className="text-center">
        <button
          className="bg-[#4096ff] rounded-[10px] p-[5px] text-white text-[13px]"
          // onClick={() => handleViewOrder()}
          // style={{
          //   margin: "10px 0px 0px 400px",
          //   background: "#ee4d2d",
          //   color: "white",
          //   borderRadius: "5px",
          //   padding: "10px",
          // }}
        >
          Xem giỏ hàng
        </button>
      </div>
    </>
  );
  console.log("check url", orderList[0]?.detail?.images[0]?.url);
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
            <ShoppingCartOutlined className="text-[32px] text-black opacity-50 font-extralight" />
          </Badge>
        </Popover>
      </div>
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
    </div>
  );
};

export default HeaderComponent;
