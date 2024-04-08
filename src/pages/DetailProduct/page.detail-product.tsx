import React, { useEffect, useState } from "react";
import SlickDetail from "../../Components/DetailProduct/SlickDetails";
import { useParams } from "react-router-dom";
import { APIGetDetailProduct } from "../../services/api";
import InforDetailProduct from "../../Components/DetailProduct/InforDetailProduct";

const DetailProductPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [productDetail, setProductDetail] = useState({});
  const { slug } = useParams<string>();
  console.log(slug);

  const getProductDetail = async () => {
    const res = await APIGetDetailProduct(slug);
    console.log(res);
    if (res && res.data) {
      setProductDetail(res.data.getProductDetails);
      setImages(
        res.data.getProductDetails.images.map((image: any) => ({
          original: image.url,
          thumbnail: image.url,
        }))
      );
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto pt-3 flex ">
      <SlickDetail images={images} />
      <InforDetailProduct productDetail={productDetail} />
    </div>
  );
};

export default DetailProductPage;
