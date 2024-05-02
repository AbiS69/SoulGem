"use-client";
import React from "react";
import Image from "next/image";

export default function CarouselItem({ imgUrl, imgTitle, imgCreator }) {
  return (
    <div className="carousel-card">
      <Image
        src={imgUrl}
        alt={imgTitle}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }} // optional
      ></Image>
      <div className="text-sm">{imgCreator}</div>
    </div>
  );
}
