import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetDetailProduct } from "../../services/api";
import "./slick-detail.css";
import ImageGallery from "react-image-gallery"; // Import React Image Gallery component
import ModalGallery from "./ModalProduct";

const SlickDetail = () => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refGallery = useRef<ImageGallery>(null);
  const [images, setImages] = useState<any[]>([]);
  const { slug } = useParams<string>();
  console.log(slug);

  const getProductDetail = async () => {
    const res = await APIGetDetailProduct(slug);
    console.log(res);
    if (res && res.data) {
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
  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };
  console.log(images);
  return (
    <div className="max-w-[500px] pt-3">
      {images.length !== 0 && (
        <ImageGallery
          ref={refGallery}
          items={images}
          showPlayButton={false} //hide play button
          showFullscreenButton={false} //hide fullscreen button
          renderLeftNav={() => <></>} //left arrow === <> </>
          renderRightNav={() => <></>} //right arrow === <> </>
          slideOnThumbnailOver={true} //onHover => auto scroll images
          onClick={() => handleOnClickImage()}
        />
      )}
      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
      />
    </div>
  );
};

export default SlickDetail;
