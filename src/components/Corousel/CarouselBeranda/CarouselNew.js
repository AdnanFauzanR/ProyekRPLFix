import React from "react";
import ImageSlider from "./ImageSlider";

const CarouselNew = ({banner}) => {
  let slides;
  if (banner.length === 0) {
    slides = [
      {banner: "assets/images/carousel/img_carousel.png"},
      {banner: "assets/images/carousel/carousel2.svg"},
      {banner: "assets/images/carousel/carousel3.svg"},
    ];
  } else {
    slides = banner;
  }
  const containerStyles = {
    width: "100%",
    height: "280px",
    margin: "20px",
  };

  return (
    <div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default CarouselNew;