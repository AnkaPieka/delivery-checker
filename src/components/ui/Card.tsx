import { Replay } from "@mui/icons-material";
import React from "react";
import "../../App.css";
import CardButton from "./CardButton";

interface CardProps {
  parent: "form" | "result";
  title: string;
  children?: React.ReactNode;
  hasButton?: boolean;
  onButtonClick?: () => void;
  className?: string;
}

const Card = ({
  parent,
  title,
  children,
  hasButton,
  onButtonClick: onClick,
  className,
}: CardProps) => {
  return (
    <div
      className={`relative h-full p-4 flex flex-col gap-2 rounded-md border border-gray-200 shadow-sm bg-white text-black ${className}`}
    >
      <h2 className="text-lg font-semibold text-black flex-shrink-0">
        {title}
      </h2>
      <div className="overflow-y-scroll h-[80%]">
        <div className="flex-1 overflow-y-auto min-h-0">{children}</div>
      </div>
      {hasButton && parent === "result" ? (
        <CardButton
          text="Reset and check another delivery"
          variant={"ghost"}
          onClick={onClick}
          iconRight={<Replay />}
        />
      ) : (
        <CardButton text="Compute" onClick={onClick} />
      )}
    </div>
  );
};

export default Card;
