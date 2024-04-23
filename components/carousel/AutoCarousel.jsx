import React from "react";
import "./autoplaycarousel.scss";
import { cardDetails } from "./carousel-config";
import ItemCarousel from "./ItemCarousel";

export default function AutoplayCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <div>cul
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
            ></ItemCarousel>
            </div>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
            ></ItemCarousel>
          );
        })}
      </div>
    </div>
  );
}