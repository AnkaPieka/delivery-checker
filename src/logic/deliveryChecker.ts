import { isDeliveriesType, isPathType } from "../test/typeGuards"
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

// Version originale
// export function checkDelivery(deliveries: deliveriesType, path: pathType) {
//   if (!isDeliveriesType(deliveries)) {
//     return {
//       status: "error",
//       error_code: "invalid_input_format",
//       error_message: "The 'deliveries' parameter must be an array of numbers.",
//     }
//   }

//   if (!isPathType(path)) {
//     return {
//       status: "error",
//       error_code: "invalid_input_format",
//       error_message: "The 'path' parameter must be an array of numbers",
//     }
//   }

//   const newDeliveryCheckList: newDeliveryCheckType[][] = deliveries.map(
//     (delivery: deliveryType) => {
//       const newDeliveryList: newDeliveryCheckType[] = delivery.map(
//         (d, index) => {
//           return {
//             type: index === 0 ? "pickup" : "dropoff",
//             id: d,
//             position: path.findIndex((p) => p === d),
//           }
//         }
//       )

//       return newDeliveryList
//     }
//   )

//   for (const delivery of newDeliveryCheckList) {
//     const pickup = delivery[0]
//     const dropoff = delivery[1]

//     if (pickup.position < 0 || dropoff.position < 0) {
//       const error = {
//         status: "error",
//         error_code: "delivery_address_not_in_path",
//         error_message: `The delivery address ${
//           pickup.position < 0 ? pickup.id : dropoff.id
//         } is not on your route.`,
//       }
//       console.log(JSON.stringify(error))
//       return error
//     }

//     if (pickup.position > dropoff.position) {
//       const error = {
//         status: "error",
//         error_code: "delivery_dropoff_before_pickup",
//         error_message: `Dropoff of parcel at address ${dropoff.id} occurs before its pickup at ${pickup.id}.`,
//       }
//       console.log(JSON.stringify(error))
//       return error
//     }
//   }

//   const successfulDeliveries: successType = {
//     status: "success",
//     steps: path.map((p) => {
//       const action: actionType =
//         newDeliveryCheckList
//           .map(
//             (newDeliveryCheckElement) =>
//               newDeliveryCheckElement.find((elem) => elem.id === p)?.type
//           )
//           .find((elem) => elem) || null

//       return {
//         address: p,
//         action: action || null,
//       }
//     }),
//   }

//   console.log(JSON.stringify(successfulDeliveries))
//   return successfulDeliveries
// }
