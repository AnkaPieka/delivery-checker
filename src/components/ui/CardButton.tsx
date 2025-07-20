import { SvgIconProps } from "@mui/material";
import React from "react";

interface CardButtonProps {
  text: string;
  variant?: "default" | "ghost";
  onClick?: () => void;
  iconRight?: React.ReactElement<SvgIconProps>;
}

const CardButton = ({
  text,
  variant = "default",
  onClick,
  iconRight,
}: CardButtonProps) => {
  return (
    <button
      type="button"
      className={`${
        variant === "ghost" && "ghost"
      } flex items-center justify-center gap-2 absolute bottom-4 left-4 w-[calc(100%-2rem)]`}
      onClick={onClick}
    >
      {text}
      {iconRight}
    </button>
  );
};

export default CardButton;
