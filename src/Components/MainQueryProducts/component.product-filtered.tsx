import { Button, Image, Rate } from "antd";

type PropsType = {
  allProductFilter: any[];
};
const ProductFiltered = ({ allProductFilter }: PropsType) => {
  console.log(allProductFilter);
  return (
    <div className="product-filtered w-[800px] grid grid-cols-2 mb-2">
      {allProductFilter &&
        allProductFilter.length !== 0 &&
        allProductFilter.map((product: any) => {
          return (
            <div key={product?._id}>
              <div className="mx-[10px] max-w-[315px] h-[400px] cursor-pointer mt-[50px] border hover:shadow-xl rounded-lg">
                <Image
                  height={200}
                  className="object-cover"
                  width={312}
                  src={product?.images[1]?.url}
                  alt="Image Product"
                />
                <div className="info-product-item px-2">
                  <p className="text-center min-h-[50px] hover:text-[#167fff]">
                    {product.name}
                  </p>
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
    </div>
  );
};

export default ProductFiltered;
