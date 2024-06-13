"use client";

import React from "react";

const ButtonGradient = ({
  title = "Gradient Button",
  onClick = () => {}
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="btn btn-gradient hover:scale-110 hover:ring-violet-300 active:bg-violet-700 ring-2 focus:outline-none focus:ring ring-blue-300 md:text-lg shadow-lg h-3rem"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonGradient;
