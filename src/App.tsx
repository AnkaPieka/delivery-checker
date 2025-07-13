import React, { useState, useCallback } from "react"
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

  const validateDeliveries = useCallback((input: string) => {
    try {
      const trimmed = input.trim()
      if (!trimmed)
        return { isValid: false, error: "Deliveries list cannot be empty" }

      const parsed = JSON.parse(trimmed)

      if (!Array.isArray(parsed)) {
        return { isValid: false, error: "Deliveries must be an array" }
      }

      const allNumbers: number[] = []
      const numberSet = new Set<number>()

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

        // Check for duplicates within the same delivery
        if (delivery[0] === delivery[1]) {
          return {
            isValid: false,
            error: `Delivery ${i + 1} cannot have identical numbers [${
              delivery[0]
            }, ${delivery[1]}]`,
          }
        }

        // Check for duplicates across all deliveries in one pass
        for (const num of delivery) {
          if (numberSet.has(num)) {
            return {
              isValid: false,
              error: `Duplicate number ${num} found across deliveries`,
            }
          }
          numberSet.add(num)
        }
      }

      return { isValid: true, data: parsed }
    } catch (error) {
      return {
        isValid: false,
        error: "Invalid JSON format. Expected format: [[1, 3], [2, 5]]",
      }
    }
  }, [])

  const validatePath = useCallback((input: string) => {
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

      const numberSet = new Set<number>()
      for (let i = 0; i < parsed.length; i++) {
        const num = parsed[i]
        if (numberSet.has(num)) {
          return {
            isValid: false,
            error: `Duplicate number ${num} found in path at position ${i + 1}`,
          }
        }
        numberSet.add(num)
      }

      return { isValid: true, data: parsed }
    } catch (error) {
      return {
        isValid: false,
        error: "Invalid JSON format. Expected format: [1, 2, 3, 4, 5]",
      }
    }
  }, [])

  const onCheckButtonClick = useCallback(() => {
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

    const deliveries = deliveriesValidation.data as deliveriesType
    const path = pathValidation.data as pathType

    const checkedResult = checkDelivery(deliveries, path)
    setResult(checkedResult)
  }, [rawDeliveries, rawPath, validateDeliveries, validatePath])

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
