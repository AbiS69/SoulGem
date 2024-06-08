import React from "react";
import "./autoplaycarousel.scss";
import { cardDetails } from "./carousel-config";
import ItemCarousel from "./ItemCarousel";

export default function AutoCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {Object.keys(cardDetails).map((detailKey, index) => {
          return (
            <ItemCarousel
              key={index}
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              imgCreator={cardDetails[detailKey].creator}
            ></ItemCarousel>
          );
        })}
      </div>
    </div>
  );
}
