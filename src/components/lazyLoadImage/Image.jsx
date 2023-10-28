import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ className, src, alt }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      src={src}
      alt={alt}
      effect="blur"
    />
  );
};

export default Image;
