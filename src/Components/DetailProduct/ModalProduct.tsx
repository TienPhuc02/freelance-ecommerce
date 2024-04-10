import { Col, Image, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./SlickDetail.css";

const ModalGallery = (props: any) => {
  const { isOpen, setIsOpen, currentIndex, items } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const refGallery = useRef<ImageGallery>(null);
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  return (
    <Modal
      width={"60vw"}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null} //hide footer
      closable={false} //hide close button
      className="modal-gallery"
    >
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <ImageGallery
            ref={refGallery}
            items={items}
            showPlayButton={false} //hide play button
            showFullscreenButton={false} //hide fullscreen button
            startIndex={currentIndex} // start at current index
            showThumbnails={false} //hide thumbnail
            onSlide={(i) => setActiveIndex(i)}
            slideDuration={0} //duration between slices
          />
        </Col>
        <Col span={8}>
          <div>
            <Row gutter={[20, 20]}>
              {items?.map((item: any, i: any) => {
                return (
                  <Col key={`image-${i}`}>
                    <Image
                      wrapperClassName={"img-normal"}
                      width={100}
                      height={100}
                      src={item.original}
                      preview={false}
                      onClick={() => {
                        refGallery?.current?.slideToIndex(i);
                      }}
                    />
                    <div className={activeIndex === i ? "active" : ""}></div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
