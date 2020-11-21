import React, { FC } from "react";
import { IconProps } from "../../types/types";

const ChevronDown: FC<IconProps> = ({
  height,
  width,
  customClass,
  onClickFunction,
}) => {
  return (
    <svg
      className={`icon-stroke ${customClass ? customClass : ""}`}
      onClick={onClickFunction}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default ChevronDown;
