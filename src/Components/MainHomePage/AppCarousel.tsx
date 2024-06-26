import React, { useEffect, useState } from "react";
import { Button, Carousel, Image, message, Rate } from "antd";
import "./style.carousel.css";
import { APIGetAllProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "black",
        fontSize: "30px",
        display: "block",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "black",
        fontSize: "30px",
        lineHeight: "1.5715",
        display: "block",
        border: 1,
        borderWidth: 2,
      }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const CarouselMain: React.FC = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [arrayListCategory, setArrayListCategory] = useState<string[]>([]);
  const navigate = useNavigate();
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const getAllProduct = async () => {
    const allProduct = await APIGetAllProduct();
    console.log(allProduct);
    if (allProduct && allProduct.data) {
      message.success(allProduct.data.message);
      setAllProduct(allProduct.data.products);
      const categories = allProduct.data.products.map(
        (product: any) => product.category
      ) as string[];
      const uniqueCategories = Array.from(new Set(categories));
      setArrayListCategory((prevCategories) => [
        ...prevCategories,
        ...uniqueCategories,
      ]);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  console.log(allProduct);
  if (arrayListCategory.length !== 0) {
    const stringifiedCategories = JSON.stringify(arrayListCategory);
    localStorage.setItem("arrayCategory", stringifiedCategories);
  }
  return (
    <>
      <Carousel
        arrows
        afterChange={onChange}
        {...settings}
        dots={false}
        focusOnSelect={true}
      >
        {allProduct.length !== 0 &&
          allProduct.map((product: any) => {
            return (
              <div key={product?._id}>
                <div className="mx-[10px] h-[400px] cursor-pointer mt-[50px] border hover:shadow-xl rounded-lg">
                  <Image
                    height={200}
                    className="object-cover"
                    width={312}
                    src={product?.images[1]?.url}
                    alt="Image Product"
                  />
                  <div
                    className="info-product-item px-2"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <p className="text-center min-h-[50px] hover:text-[#167fff]">
                      {product.name}
                    </p>
                    <div className="rating-review flex">
                      <Rate
                        disabled
                        defaultValue={product.ratings}
                        className="mr-2"
                      />
                      <span>({product.stock})</span>
                    </div>
                    <div className="mt-[10px] font-medium text-[25px]">
                      ${product.price}
                    </div>
                    <div className="button-view-details">
                      <Button
                        type="primary"
                        className="bg-[#1677ff] w-full mt-[20px]"
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </>
  );
};

export default CarouselMain;
