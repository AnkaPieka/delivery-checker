import { Inventory2, LocalShipping, LocationOn } from "@mui/icons-material"
import React from "react"

type TimelineType = {
  result: any
}

const Timeline = ({ result }: TimelineType) => {
  const config = {
    pickup: {
      label: "Pickup",
      color: "bg-green-500",
      icon: <LocalShipping className="text-white w-4 h-4" />,
    },
    dropoff: {
      label: "Dropoff",
      color: "bg-blue-500",
      icon: <Inventory2 className="text-white w-4 h-4" />,
    },
    null: {
      label: "No action",
      color: "bg-gray-400",
      icon: <LocationOn className="text-white w-4 h-4" />,
    },
  }

  if (result.status === "error") return <div></div>

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap w-full py-4 px-2">
      {result.steps.map((step, index) => {
        const action = step.action ?? "null"
        const { label, color, icon } = config[action]

        return (
          <div
            key={`${step.address}-${index}`}
            className="flex flex-col items-center flex-wrap justify-between min-w-[60px] width-auto w-20"
          >
            <div className="text-xs text-gray-700 mt-1">#{step.address}</div>

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
            >
              {icon}
            </div>

            <div className="text-xs text-gray-700 mt-1">{label}</div>

            {index !== result.steps.length - 1 && (
              <div className="absolute h-1 w-10 bg-gray-300 top-[30px] left-[60px] -z-10" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
