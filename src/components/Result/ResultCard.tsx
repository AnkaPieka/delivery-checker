import React from "react";
import Card from "../ui/Card";
import EmptyState from "./EmptyState";
import ResultContent from "./ResultContent";
import { successType, errorType } from "../../logic/types";
import "../../App.css";

interface ResultCardProps {
  result: successType | errorType;
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
      title="2. Delivery plan"
      className="relative w-full md:w-[60%]"
      onButtonClick={resetAll}
    >
      {result ? <ResultContent result={result} /> : <EmptyState />}
    </Card>
  );
};

export default ResultCard;
