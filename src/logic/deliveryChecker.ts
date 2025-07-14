import { isDeliveriesType, isPathType } from "./typeGuards"
import {
  actionType,
  deliveriesType,
  newDeliveryCheckType,
  pathType,
} from "../types"

// Version optimisée avec LLM Claude
const createAndLogError = (errorCode: string, errorMessage: string) => {
  const error = {
    status: "error" as const,
    error_code: errorCode,
    error_message: errorMessage,
  }
  console.log(JSON.stringify(error))
  return error
}

export function checkDelivery(deliveries: deliveriesType, path: pathType) {
  if (!isDeliveriesType(deliveries)) {
    return createAndLogError(
      "invalid_input_format",
      "The 'deliveries' parameter must be an array of address pairs."
    )
  }

  if (!isPathType(path)) {
    return createAndLogError(
      "invalid_input_format",
      "The 'path' parameter must be an array of numbers."
    )
  }

  const addressIndexMap = new Map<number, number>()
  path.forEach((address, index) => {
    addressIndexMap.set(address, index)
  })

  const deliveriesWithMeta: newDeliveryCheckType[][] = deliveries.map(
    (delivery) =>
      delivery.map((address, index) => ({
        type: index === 0 ? "pickup" : "dropoff",
        id: address,
        position: addressIndexMap.get(address) ?? -1,
      }))
  )

  for (const deliveryPair of deliveriesWithMeta) {
    const [pickup, dropoff] = deliveryPair

    if (pickup.position < 0 || dropoff.position < 0) {
      return createAndLogError(
        "delivery_address_not_in_path",
        `The delivery address ${
          pickup.position < 0 ? pickup.id : dropoff.id
        } is not on your route.`
      )
    }

    if (pickup.position > dropoff.position) {
      return createAndLogError(
        "delivery_dropoff_before_pickup",
        `Dropoff of parcel at address ${dropoff.id} occurs before its pickup at ${pickup.id}.`
      )
    }
  }

  const actionMap = new Map<number, actionType>()
  for (const delivery of deliveriesWithMeta) {
    for (const step of delivery) {
      actionMap.set(step.id, step.type)
    }
  }

  const successResult = {
    status: "success" as const,
    steps: path.map((address) => ({
      address,
      action: actionMap.get(address) ?? null,
    })),
  }

  console.log(JSON.stringify(successResult))
  return successResult
}