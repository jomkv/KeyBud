import IPhoto from "../../@types/photoType";

import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

interface IImageCarouselProps {
  images: IPhoto[];
  isPostPage?: boolean;
  imageHeight?: string;
}

const ImageCarousel: React.FC<IImageCarouselProps> = ({
  images,
  isPostPage,
  imageHeight,
}) => {
  const [height, setHeight] = useState<string>("15rem");

  useEffect(() => {
    if (imageHeight) {
      setHeight(imageHeight);
    } else if (isPostPage) {
      setHeight("25rem");
    } else {
      setHeight("15rem");
    }
  }, []);

  return (
    <Carousel controls={images.length > 1} indicators={false} interval={null}>
      {images.map((image: IPhoto, index: number) => (
        <Carousel.Item>
          <div
            className="d-flex justify-content-center rounded"
            style={{
              width: "100%",
              backgroundColor: "#2F2F2F",
              height: height,
            }}
            key={index}
          >
            <img
              key={index}
              src={image.url}
              alt={`Slide #${index + 1}`}
              className="img-fluid m-0 p-0"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
