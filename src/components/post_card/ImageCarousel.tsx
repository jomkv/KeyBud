import IPhoto from "../../@types/photoType";

import Carousel from "react-bootstrap/Carousel";

interface IImageCarouselProps {
  images: IPhoto[];
}

const ImageCarousel: React.FC<IImageCarouselProps> = ({ images }) => {
  return (
    <Carousel controls={images.length > 1} indicators={false} interval={null}>
      {images.map((image: IPhoto, index: number) => (
        <Carousel.Item>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "100%",
              height: "30rem",
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
