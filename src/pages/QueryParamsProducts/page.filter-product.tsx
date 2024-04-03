import { useParams } from "react-router-dom";
import { APIGetAllProduct } from "../../services/api";
import { useEffect } from "react";
import { message } from "antd";

const MainFilterProduct = () => {
  const { slug } = useParams();
  console.log(slug);

  const getProductFilterKeyWord = async () => {
    if (slug) {
      const res = await APIGetAllProduct(slug);
      console.log(res);
      message.success(`Lấy sản phẩm với từ khóa là "${slug.split("=")[1]}"`);
    }
  };

  useEffect(() => {
    getProductFilterKeyWord();
  }, [slug]);

  return (
    <div className="min-h-[600px] pt-5 max-w-[1200px] mx-auto">
      MainFilterProduct
    </div>
  );
};

export default MainFilterProduct;
