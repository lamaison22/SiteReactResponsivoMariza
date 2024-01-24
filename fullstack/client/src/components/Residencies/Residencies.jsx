import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
const Residencies = () => {
  const {data, isError, isLoading}=useProperties()
  if(isError){
    return (
      <div className="wrapper">
        <span>Erro enquanto obtinha dados</span>
      </div>
    )
  }
  if(isLoading){
      <div className="wrapper flexCenter" style={{height:"60vh"}}>
        <PuffLoader height="80" width="80" radius ={1} color='#4066ff' aria-label='puff-loading' />
      </div>
  }

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Melhores Escolhas</span>
          <span className="primaryText">Imóveis Populares</span>
        </div>
        <Swiper {...sliderSettings}>
          {/* slider */}
          {data?.slice(0,8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;


