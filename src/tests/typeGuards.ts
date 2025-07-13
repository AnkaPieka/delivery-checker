import { deliveryType } from "../types"

function isDeliveryType(value: any): value is deliveryType {
  return Array.isArray(value) && value.every((item) => typeof item === "number")
}

export function isDeliveriesType(value: any): value is deliveryType {
  return (
    Array.isArray(value) && value.every((delivery) => isDeliveryType(delivery))
  )
}

export function isPathType(value: any): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number")
}
