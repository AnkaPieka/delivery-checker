import React, { useState } from "react"
import "./App.css"
import FormCard from "./components/FormCard"
import ResultCard from "./components/ResultCard"
import { checkDelivery } from "./logic/deliveryChecker"
import { deliveriesType, pathType } from "./types"
import Header from "./ui/Header"

function App() {
  const [rawDeliveries, setRawDeliveries] = useState("")
  const [rawPath, setRawPath] = useState("")
  const [result, setResult] = useState<[] | undefined>(undefined)

  const [deliveriesError, setDeliveriesError] = useState("")
  const [pathError, setPathError] = useState("")

  const validateDeliveries = (input: string) => {
    try {
      const trimmed = input.trim()
      if (!trimmed)
        return { isValid: false, error: "Deliveries list cannot be empty" }

      const parsed = JSON.parse(trimmed)

      if (!Array.isArray(parsed)) {
        return { isValid: false, error: "Deliveries must be an array" }
      }

      for (let i = 0; i < parsed.length; i++) {
        const delivery = parsed[i]
        if (!Array.isArray(delivery)) {
          return {
            isValid: false,
            error: `Delivery ${i + 1} must be an array`,
          }
        }
        if (delivery.length !== 2) {
          return {
            isValid: false,
            error: `Delivery ${i + 1} must have exactly 2 elements`,
          }
        }
        if (
          !delivery.every(
            (num) => typeof num === "number" && Number.isInteger(num)
          )
        ) {
          return {
            isValid: false,
            error: `Delivery ${i + 1} must contain only integers`,
          }
        }
      }

      return { isValid: true, data: parsed }
    } catch (error) {
      return {
        isValid: false,
        error: "Invalid JSON format. Expected format: [[1, 3], [2, 5]]",
      }
    }
  }

  const validatePath = (input: string) => {
    try {
      const trimmed = input.trim()
      if (!trimmed) return { isValid: false, error: "Path cannot be empty" }

      const parsed = JSON.parse(trimmed)

      if (!Array.isArray(parsed)) {
        return { isValid: false, error: "Path must be an array" }
      }

      if (
        !parsed.every((num) => typeof num === "number" && Number.isInteger(num))
      ) {
        return { isValid: false, error: "Path must contain only integers" }
      }

      return { isValid: true, data: parsed }
    } catch (error) {
      return {
        isValid: false,
        error: "Invalid JSON format. Expected format: [1, 2, 3, 4, 5]",
      }
    }
  }

  const onCheckButtonClick = () => {
    const deliveriesValidation = validateDeliveries(rawDeliveries)
    if (!deliveriesValidation.isValid) {
      setDeliveriesError(deliveriesValidation.error)
      return
    }

    const pathValidation = validatePath(rawPath)
    if (!pathValidation.isValid) {
      setPathError(pathValidation.error)
      return
    }

    setDeliveriesError("")
    setPathError("")

    const deliveries = JSON.parse(rawDeliveries) as deliveriesType
    const path = JSON.parse(rawPath) as pathType

    const checkedResult = checkDelivery(deliveries, path)
    setResult(checkedResult)
  }

  return (
    <div className="w-full h-full">
      <Header />

      <div className="h-full mx-4 sm:mx-8 md:mx-32 text-white">
        <div className="h-full flex flex-col md:flex-row gap-4 md:gap-12">
          <FormCard
            rawDeliveries={rawDeliveries}
            rawPath={rawPath}
            setRawDeliveries={setRawDeliveries}
            setRawPath={setRawPath}
            onCheckButtonClick={onCheckButtonClick}
            pathError={pathError}
            deliveriesError={deliveriesError}
          />
          <ResultCard
            result={result}
            setRawDeliveries={setRawDeliveries}
            setRawPath={setRawPath}
            setResult={setResult}
          />
        </div>
      </div>
    </div>
  )
}

export default App
