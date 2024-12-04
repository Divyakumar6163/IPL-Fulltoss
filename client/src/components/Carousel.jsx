import React from "react";
import Img1 from "../images/img4.jpg";

const Carousel = () => {
  return (
    <section className="relative h-full">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative overflow-hidden h-64 sm:h-96 lg:h-[650px]">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="relative w-full h-full">
              <img
                src={Img1}
                className=" block w-full h-full object-cover"
                alt="Slide 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
