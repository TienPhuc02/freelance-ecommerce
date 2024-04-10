import "./SlickDetail.css";
import ImageGallery from "react-image-gallery";
import ModalGallery from "./ModalProduct";
import { useRef, useState } from "react";

const SlickDetail = ({ images }: { images: any }) => {
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refGallery = useRef<ImageGallery>(null);
  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
  };
  console.log(images);
  return (
    <div className="w-[500px] mr-[50px]">
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
