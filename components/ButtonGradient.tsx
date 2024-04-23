"use client";

import React from "react";

const ButtonGradient = ({
  title = "Gradient Button",
  onClick = () => {},
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <button className="btn btn-gradient animate-shimmer hover:scale-110 hover:ring-violet-300 active:bg-violet-700 ring-4 focus:outline-none focus:ring ring-blue-300 md:text-lg shadow-lg lg:h-14" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonGradient;
