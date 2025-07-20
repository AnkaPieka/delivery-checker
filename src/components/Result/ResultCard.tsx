import { WarningRounded } from "@mui/icons-material";
import React from "react";
import "../../App.css";
import Timeline from "./ResultTimeline";
import Card from "../ui/Card";
import ResultTable from "./ResultTable";

interface ResultCardProps {
  result: any;
  setRawDeliveries: React.Dispatch<React.SetStateAction<string>>;
  setRawPath: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<[] | undefined>>;
}

const ResultCard = ({
  result,
  setRawDeliveries,
  setRawPath,
  setResult,
}: ResultCardProps) => {
  const resetAll = () => {
    setRawDeliveries("");
    setRawPath("");
    setResult(undefined);
  };

  return (
    <Card
      parent="result"
      title={"2. Delivery plan"}
      className="relative w-full md:w-[60%]"
      hasButton
      onButtonClick={resetAll}
    >
      {result ? (
        <div className="relative h-full flex flex-col items-center">
          <div className="w-full">
            {result.status === "success" ? (
              <div className="w-full border-solid border-1 border-green-900 rounded-sm p-2 bg-green-100 text-green-900 mt-4">
                You're good to go!
              </div>
            ) : (
              <div className="w-full flex border-solid border-1 border-red-900 rounded-sm p-2 bg-red-100 text-red-900 mt-4 gap-2">
                <WarningRounded />
                <p>The delivery plan has a problem</p>
              </div>
            )}
          </div>
          <div>
            <Timeline result={result} />

            {result.status === "success" ? (
              <ResultTable result={result} />
            ) : (
              <div className="min-h-40 mt-2 p-4 text-red-900">
                {result.error_message}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full text-gray-500 flex items-center justify-center mb-20">
          Compute your data to check your delivery. The result will be displayed
          here.
        </div>
      )}
    </Card>
  );
};

export default ResultCard;
