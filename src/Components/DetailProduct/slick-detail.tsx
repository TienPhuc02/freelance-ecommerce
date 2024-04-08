import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetDetailProduct } from "../../services/api";
import "./slick-detail.css";
import ImageGallery from "react-image-gallery"; // Import React Image Gallery component

const SlickDetail = () => {
  const refGallery = useRef(null);
  const [images, setImages] = useState([]);
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
        />
      )}
    </div>
  );
};

export default SlickDetail;
