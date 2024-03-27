import React, { useEffect, useState } from "react";
import { Button, Carousel, Image, message, Pagination, Rate } from "antd";
import "./style.carousel.css";
import { APIGetAllProduct } from "../../services/api";

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "black",
        fontSize: "30px",
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
        border: 1,
        borderWidth: 2,
      }}
      onClick={onClick}
    />
  );
};

const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const CarouselMain: React.FC = () => {
  const [allProduct, setAllProduct] = useState([]);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const getAllProduct = async () => {
    const allProduct = await APIGetAllProduct();
    console.log(allProduct);
    if (allProduct && allProduct.data) {
      message.success(allProduct.data.message);
      setAllProduct(allProduct.data.products);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  console.log(allProduct);
  return (
    <>
      <Carousel
        arrows
        afterChange={onChange}
        slidesToShow={3}
        slidesToScroll={1}
        {...settings}
        dots={false}
        focusOnSelect={true}
      >
        {allProduct.length !== 0 &&
          allProduct.map((product: any) => {
            return (
              <div key={product?._id}>
                <div className="mx-[10px] h-[400px] mt-[50px] border ">
                  <Image
                    height={200}
                    className="object-cover"
                    width={312}
                    src={product?.images[1]?.url}
                    alt="Image Product"
                  />
                  <div className="info-product-item px-2">
                    <p className="text-center min-h-[50px]">{product.name}</p>
                    <div className="rating-review flex">
                      <Rate
                        disabled
                        defaultValue={product.ratings}
                        className="mr-2"
                      />
                      <span>({product.numOfReview})</span>
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
