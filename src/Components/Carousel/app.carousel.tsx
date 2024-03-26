import React from "react";
import { Carousel } from "antd";
import "./style.carousel.css";

const CarouselMain: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
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
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Carousel
      arrows
      afterChange={onChange}
      slidesToShow={3}
      {...settings}
      dots={false}
    >
      <div>
        <div className="mx-[10px] h-[300px] mt-[50px] border">1</div>
      </div>
      <div>
        <div className="mx-[10px] h-[300px] mt-[50px] border">2</div>
      </div>
      <div>
        <div className="mx-[10px] h-[300px] mt-[50px] border">3</div>
      </div>
      <div>
        <div className="mx-[10px] h-[300px] mt-[50px] border">4</div>
      </div>
    </Carousel>
  );
};

export default CarouselMain;
