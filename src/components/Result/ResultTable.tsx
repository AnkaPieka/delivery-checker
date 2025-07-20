import React from "react";
import { successType } from "../../logic/types";

interface ResultTableProps {
  result: successType;
}

const ResultTable = ({ result }: ResultTableProps) => {
  return (
    <div className="w-full mb-20 mt-4">
      <table className="w-full text-sm border border-gray-200 rounded-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border-b text-left">Address</th>
            <th className="px-4 py-2 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {result.steps.map((res: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{res.address}</td>
              <td className="px-4 py-2 border-b">{res.action ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
