import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwipableView = ({ children, slidesPerView, classes, halfPageSwiper }) => {
  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={`${classes} swiper ${halfPageSwiper && "half"} `}
    >
      {children.map((item, i) => (
        <SwiperSlide key={i}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipableView;
