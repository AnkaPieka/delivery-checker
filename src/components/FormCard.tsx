import React from "react"
import "../App.css"
import Card from "../ui/Card"

type FormCardType = {
  rawDeliveries: string
  rawPath: string
  setRawDeliveries: React.Dispatch<React.SetStateAction<string>>
  setRawPath: React.Dispatch<React.SetStateAction<string>>
  onCheckButtonClick: () => void
  pathError?: string
  deliveriesError?: string
}

const FormCard = ({
  rawDeliveries,
  rawPath,
  setRawDeliveries,
  setRawPath,
  onCheckButtonClick,
  pathError,
  deliveriesError,
}: FormCardType) => {
  return (
    <Card title="1. Enter your data" className="relative w-[40%]">
      <div className="relative h-full w-full flex flex-col items-center">
        <div className="w-full mb-4">
          <div className="w-full flex flex-col p-4 pb-2">
            <label>List of deliveries</label>
            <textarea
              className="bg-[#f6f6f6]"
              rows={4}
              value={rawDeliveries}
              onChange={(e) => setRawDeliveries(e.target.value)}
              style={{ resize: "none" }}
              placeholder="[[1, 3], [2, 5]]..."
            />
            {deliveriesError && (
              <span className="text-red-500 text-sm mt-1">
                {deliveriesError}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col p-4">
            <label>Your route</label>
            <textarea
              className="bg-[#f6f6f6]"
              rows={4}
              value={rawPath}
              onChange={(e) => setRawPath(e.target.value)}
              placeholder="[1, 2, 3, 4, 5]..."
              style={{ resize: "none" }}
            />
            {pathError && (
              <span className="text-red-500 text-sm mt-1">{pathError}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          className={`w-full flex items-center justify-center absolute bottom-0 ${
            (!rawDeliveries || !rawPath) && "disabled"
          }`}
          id="delivery-check-form"
          onClick={onCheckButtonClick}
          disabled={!rawDeliveries || !rawPath}
          style={{
            cursor: !rawDeliveries || !rawPath ? "not-allowed" : "pointer",
          }}
        >
          Compute
        </button>
      </div>
    </Card>
  )
}

export default FormCard
