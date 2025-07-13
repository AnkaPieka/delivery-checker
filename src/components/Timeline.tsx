import { Inventory2, LocalShipping, LocationOn } from "@mui/icons-material"
import React from "react"

type TimelineType = {
  result: any
}

const Timeline = ({ result }: TimelineType) => {
  const config = {
    pickup: {
      label: "Pickup",
      bg_color: "bg-green-100",
      border_color: "border-green-600",
      icon: <LocalShipping className="text-green-600 w-4 h-4" />,
    },
    dropoff: {
      label: "Dropoff",
      bg_color: "bg-blue-100",
      border_color: "border-blue-600",
      icon: <Inventory2 className="text-blue-600 w-4 h-4" />,
    },
    null: {
      label: "No action",
      bg_color: "bg-gray-100",
      border_color: "border-gray-600",
      icon: <LocationOn className="text-gray-600 w-4 h-4 bg-gray" />,
    },
  }

  if (result.status === "error") return <div></div>

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap w-full py-4 px-2">
      {result.steps.map((step, index) => {
        const action = step.action ?? "null"
        const { label, bg_color, border_color, icon } = config[action]

        return (
          <div
            key={`${step.address}-${index}`}
            className="flex flex-col items-center flex-wrap justify-between min-w-[60px] width-auto w-20"
          >
            <div className="text-xs text-gray-700 mt-1">#{step.address}</div>

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${bg_color} border-solid border-2 ${border_color}`}
            >
              {icon}
            </div>

            <div className="text-xs text-gray-700 mt-1">{label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
