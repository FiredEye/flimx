import { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./carousel.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyLoadImage/Image";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((store) => store.home);
  const navigate = useNavigate();
  const [showMsg, setsShowMsg] = useState(false);
  const handleNavigation = (mediaType, movieId) => {
    if (mediaType === undefined || movieId === undefined) setsShowMsg(true);
    else navigate(`/${mediaType}/${movieId}`);
  };
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => (
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  );
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}

        {!loading ? (
          <>
            {data?.length > 0 ? (
              <>
                <BsFillArrowLeftCircleFill
                  className="carouselLeftNav arrow"
                  onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                  className="carouselRightNav arrow"
                  onClick={() => navigation("right")}
                />
                <div className="carouselItems" ref={carouselContainer}>
                  {data?.map((item) => {
                    const posterUrl = item?.poster_path
                      ? `${url?.poster}${item?.poster_path}`
                      : PosterFallback;
                    return (
                      <div
                        className="carouselItem"
                        key={item.id}
                        onClick={() =>
                          handleNavigation(
                            item?.media_type || endPoint,
                            item?.id
                          )
                        }
                      >
                        <div className="posterBlock">
                          <Image src={posterUrl} alt={`image poster`} />
                          <CircleRating
                            rating={item?.vote_average.toFixed(1)}
                          />
                          <Genres data={item?.genre_ids.slice(0, 2)} />
                        </div>
                        <div
                          className="textBlock"
                          title={item?.title || item?.name}
                        >
                          <span className="title">
                            {item?.title || item?.name}
                          </span>

                          <span className="date">
                            {dayjs(item?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <span className="resultNotFound">Sorry, Results not found</span>
            )}
          </>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
      <div className={`notFound ${showMsg ? "show" : ""}`}>
        <div className="opacityLayer" onClick={() => setsShowMsg(false)}></div>
        <div className="text">
          <p> The Preview is not available at the moment.</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
