"use-client";
import React from "react";
import Image from 'next/image';


export default function CarouselItem({ imgUrl, imgTitle }) {
  return (
    <div className="carousel-card">
      <Image src={imgUrl} alt={imgTitle} width={50} height={50}></Image>
    </div>
  );
}