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
            // eslint-disable-next-line react/jsx-key
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              imgCreator={cardDetails[detailKey].creator}
            ></ItemCarousel>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              imgCreator={cardDetails[detailKey].creator}
            ></ItemCarousel>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              imgCreator={cardDetails[detailKey].creator}
            ></ItemCarousel>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ItemCarousel
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              imgCreator={cardDetails[detailKey].creator}
            ></ItemCarousel>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ItemCarousel
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
