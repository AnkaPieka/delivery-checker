export type deliveryType = number[]
export type deliveriesType = deliveryType[]

export type pathType = number[]

export type actionType = "pickup" | "dropoff" | null

export type newDeliveryCheckType = {
  type: actionType
  id: number
  position: number
}

export type successType = {
  status: "success"
  steps: { address: number; action: actionType }[]
}

export type errorType =
  | {
      status: "error"
      error_code:
        | "delivery_address_not_in_path"
        | "delivery_dropoff_before_pickup"
      error_message: string
    }
  | false
