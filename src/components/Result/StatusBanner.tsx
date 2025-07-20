import { WarningRounded } from "@mui/icons-material";
import React from "react";

interface StatusBannerProps {
  status: "success" | "error";
}

const StatusBanner = ({ status }: StatusBannerProps) => {
  if (status === "success") {
    return (
      <div className="w-full border border-green-900 rounded-sm p-2 bg-green-100 text-green-900 mt-4">
        You're good to go!
      </div>
    );
  }

  return (
    <div className="w-full flex border border-red-900 rounded-sm p-2 bg-red-100 text-red-900 mt-4 gap-2">
      <WarningRounded />
      <p>The delivery plan has a problem</p>
    </div>
  );
};

export default StatusBanner;
