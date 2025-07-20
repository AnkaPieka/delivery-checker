import React from "react";
import StatusBanner from "./StatusBanner";
import ResultTable from "./ResultTable";
import Timeline from "./ResultTimeline";
import { errorType, successType } from "../../logic/types";
import { isSuccess } from "../../logic/typeGuards";

interface ResultContentProps {
  result: successType | errorType;
}

const ResultContent = ({ result }: ResultContentProps) => {
  return (
    <div className="relative h-full flex flex-col items-center">
      <StatusBanner status={result.status} />

      {isSuccess(result) && <Timeline result={result} />}

      {isSuccess(result) ? (
        <ResultTable result={result} />
      ) : (
        <div className="min-h-40 mt-2 p-4 text-red-900">
          {result.error_message}
        </div>
      )}
    </div>
  );
};

export default ResultContent;
