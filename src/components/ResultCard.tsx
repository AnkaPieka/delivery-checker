import { Replay, WarningRounded } from "@mui/icons-material"
import React from "react"
import "../App.css"
import Card from "../ui/Card"
import Timeline from "./Timeline"

type ResultCardType = {
  result: any
  setRawDeliveries: React.Dispatch<React.SetStateAction<string>>
  setRawPath: React.Dispatch<React.SetStateAction<string>>
  setResult: React.Dispatch<React.SetStateAction<[] | undefined>>
}

const ResultCard = ({
  result,
  setRawDeliveries,
  setRawPath,
  setResult,
}: ResultCardType) => {
  return (
    <Card
      title={"2. Delivery plan"}
      className="w-[60%]"
      hasButton
      setRawDeliveries={setRawDeliveries}
      setRawPath={setRawPath}
      setResult={setResult}
    >
      {result ? (
        <div className="relative h-full flex flex-col items-center ">
          <div className="w-full ">
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
              <div className="w-full mb-20 mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-md">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Address</th>
                      <th className="px-4 py-2 border-b text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.steps.map((res, index) => (
                      <tr
                        key={`${res.address}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 border-b">{res.address}</td>
                        <td className="px-4 py-2 border-b">
                          {res.action ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-2 p-4 text-red-900">
                {result.error_message}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full text-gray-500 flex items-center justify-center">
          Compute your data to check your delivery. The result will be displayed
          here.
        </div>
      )}
    </Card>
  )
}

export default ResultCard
