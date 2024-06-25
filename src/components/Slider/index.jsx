import React from "react";
import SwipableView from "../../components/ui/organism/SwipeableView";
import "./slider.scss";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Slider = ({ slides, classes }) => {
  return (
    <SwipableView slidesPerView={1} classes={classes} halfPageSwiper>
      {slides.map((slide, i) => (
        <div key={i} className="slides">
          <h1 className="c-black mt-10 text-center fs-32">{slide.title}</h1>
          <p className="c-black text-center">{slide.description}</p>
        </div>
      ))}
    </SwipableView>
  );
};

export default Slider;

export const SliderDots = ({
  length,
  curr,
  setCurr,
  classes,
  noArrows,
  white,
}) => {
  const onDotClick = (i) => setCurr(i);
  const onArrowClick = (type) => {
    if (type === 0) {
      curr === 0 ? setCurr(length - 1) : setCurr(curr - 1);
    } else {
      curr === length - 1 ? setCurr(0) : setCurr(curr + 1);
    }
  };

  return (
    <div className={`slider-dots ${classes}`}>
      {!noArrows && (
        <ChevronLeftIcon
          className="hover-scale"
          sx={{ mr: 3 }}
          onClick={() => onArrowClick(0)}
        />
      )}
      {Array(length)
        .fill(0)
        .map((d, i) => (
          <div
            onClick={() => onDotClick(i)}
            className={`dot ${curr === i && "dot-selected"} ${
              white && "white"
            }`}
          />
        ))}
      {!noArrows && (
        <ChevronRightIcon
          className="hover-scale"
          sx={{ ml: 3 }}
          onClick={() => onArrowClick(1)}
        />
      )}
    </div>
  );
};
