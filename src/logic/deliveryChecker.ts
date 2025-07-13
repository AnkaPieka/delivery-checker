import { isDeliveriesType, isPathType } from "../tests/typeGuards"
import {
  deliveriesType,
  pathType,
  errorType,
  newDeliveryCheckType,
  deliveryType,
  successType,
  actionType,
} from "../types"

export function checkDelivery(deliveries: deliveriesType, path: pathType) {
  if (!isDeliveriesType(deliveries)) {
    return {
      status: "error",
      error_code: "invalid_input_format",
      error_message:
        "Le paramètre 'deliveries' doit être un tableau de tableaux de nombres",
    }
  }

  if (!isPathType(path)) {
    return {
      status: "error",
      error_code: "invalid_input_format",
      error_message: "Le paramètre 'path' doit être un tableau de nombres",
    }
  }

  let error: errorType = false

  const newDeliveryCheckList: newDeliveryCheckType[][] = deliveries.map(
    (delivery: deliveryType) => {
      const newDeliveryList: newDeliveryCheckType[] = delivery.map(
        (d, index) => {
          return {
            type: index === 0 ? "pickup" : "dropoff",
            id: d,
            position: path.findIndex((p) => p === d),
          }
        }
      )

      return newDeliveryList
    }
  )

  newDeliveryCheckList.forEach((newDelCheckElement, index) => {
    const pickup = newDelCheckElement[0]
    const dropoff = newDelCheckElement[1]

    if (pickup.position < 0 || dropoff.position < 0) {
      error = {
        status: "error",
        error_code: "delivery_address_not_in_path",
        error_message: `The delivery list contains an address that is not on your route: ${
          pickup.position < 0 ? pickup.id : dropoff.id
        }.`,
      }
    } else if (pickup.position > dropoff.position) {
      error = {
        status: "error",
        error_code: "delivery_dropoff_before_pickup",
        error_message: `Incorrect route: you cannot drop off a parcel that you have not yet collected! Delivery identifier: ${index}.`,
      }
    }

    return error
  })

  if (error) return error
  else {
    const successfulDeliveries: successType = {
      status: "success",
      steps: path.map((p) => {
        const action: actionType =
          newDeliveryCheckList
            .map(
              (newDeliveryCheckElement) =>
                newDeliveryCheckElement.find((elem) => elem.id === p)?.type
            )
            .find((elem) => elem) || null

        return {
          address: p,
          action: action || null,
        }
      }),
    }

    return successfulDeliveries
  }
}
