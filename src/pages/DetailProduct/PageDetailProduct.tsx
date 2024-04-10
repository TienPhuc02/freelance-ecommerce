import React, { useEffect, useState } from "react";
import SlickDetail from "../../Components/DetailProduct/SlickDetails";
import { useParams } from "react-router-dom";
import { APIGetDetailProduct } from "../../services/api";
import InforDetailProduct from "../../Components/DetailProduct/InforDetailProduct";
import { Form, InputNumberProps, message } from "antd";
import { useDispatch } from "react-redux";
import { doProductAction } from "../../redux/features/order/orderSlice";
import { useSelector } from "react-redux";

const DetailProductPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [productDetail, setProductDetail] = useState<any>({});
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [valueQuantityNumber, setValueQuantityNumber] = useState(0);
  const { slug } = useParams<string>();
  const listProductOrder = useSelector((state: any) => state.order.cart);
  console.log(listProductOrder);
  const IncreaseInput = () => {
    if (valueQuantityNumber < productDetail.stock) {
      const newValue = valueQuantityNumber + 1;
      setValueQuantityNumber(newValue);
      form.setFieldsValue({ valueQuantity: newValue });
    } else {
      message.error("Sản phẩm đã hết hàng");
    }
  };

  const DecreaseInput = () => {
    if (valueQuantityNumber > 0) {
      const newValue = valueQuantityNumber - 1;
      setValueQuantityNumber(newValue);
      form.setFieldsValue({ valueQuantity: newValue });
    } else {
      message.error("Tối thiểu số sản phẩm là 0");
    }
  };
  const onChange: InputNumberProps["onChange"] = (value: any) => {
    setValueQuantityNumber(value);
  };
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
  function findElementById(arr, id) {
    return arr.find((item: any) => item.id === id);
  }
  const handleAddProduct = (quantity: any, product: any) => {
    console.log(product._id);
    if (listProductOrder.length !== 0) {
      const productCheckStock = findElementById(listProductOrder, product._id);
      console.log(productCheckStock);
      if(productCheckStock.detail.stock===0){
        message.error("Sản Phẩm đã hết hàng")
      }
    }
    console.log("check quantity >>>", quantity);
    console.log("check quantity >>>", product);
    dispatch(doProductAction({ quantity, detail: product, _id: product._id }));
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  console.log(valueQuantityNumber);
  return (
    <div className="max-w-[1200px] mx-auto pt-3 flex ">
      <SlickDetail images={images} />
      <InforDetailProduct
        productDetail={productDetail}
        DecreaseInput={DecreaseInput}
        IncreaseInput={IncreaseInput}
        valueQuantityNumber={valueQuantityNumber}
        form={form}
        onChange={onChange}
        handleAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default DetailProductPage;
