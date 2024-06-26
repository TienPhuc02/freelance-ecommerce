import CarouselMain from "../../Components/MainHomePage/AppCarousel";
const PageHome = () => {
  return (
    <div className="min-h-[600px] pt-5 max-w-[1000px] mx-auto">
      <p className="text-[20px]">Sản phẩm mới nhất</p>
      <div className="carousel-slider-main">
        <CarouselMain />
      </div>
    </div>
  );
};

export default PageHome;
