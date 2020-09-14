import React, { FC } from "react";

const Logo: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="205"
      height="39"
      viewBox="0 0 205 39"
    >
      <text
        transform="translate(0 31)"
        fill="#454545"
        fontSize="30"
        fontFamily="Futura-Bold, Futura"
        fontWeight="700"
        letterSpacing="-0.04em"
      >
        <tspan x="0" y="0">
          LOREM{" "}
        </tspan>
        <tspan
          y="0"
          fill="#ff6a00"
          fontFamily="Futura-Medium, Futura"
          fontWeight="500"
        >
          IPSUM
        </tspan>
      </text>
    </svg>
  );
};

export default Logo;
