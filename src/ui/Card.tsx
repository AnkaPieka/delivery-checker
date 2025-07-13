import { Replay } from "@mui/icons-material"
import React from "react"
import "../App.css"

type CardProps = {
  title: string
  children?: React.ReactNode
  hasButton?: boolean
  setRawDeliveries?: React.Dispatch<React.SetStateAction<string>>
  setRawPath?: React.Dispatch<React.SetStateAction<string>>
  setResult?: React.Dispatch<React.SetStateAction<[] | undefined>>
  className?: string
}

const Card = ({
  title,
  children,
  hasButton,
  setRawDeliveries,
  setRawPath,
  setResult,
  className,
}: CardProps) => {
  return (
    <div
      className={`relative h-full p-4 flex flex-col gap-2 rounded-md border border-gray-200 shadow-sm bg-white text-black h-full ${className}`}
    >
      <h2 className="text-lg font-semibold text-black flex-shrink-0">
        {title}
      </h2>
      <div className="flex-1 overflow-y-auto min-h-0">{children}</div>

      {hasButton && setRawDeliveries && setRawPath && setResult && (
        <button
          type="button"
          className="ghost flex items-center justify-center gap-2 absolute bottom-4 left-4 w-[calc(100%-2rem)]"
          form="reset-and-check-button"
          onClick={() => {
            setRawDeliveries("")
            setRawPath("")
            setResult(undefined)
          }}
        >
          Reset and check another delivery
          <Replay />
        </button>
      )}
    </div>
  )
}

export default Card
