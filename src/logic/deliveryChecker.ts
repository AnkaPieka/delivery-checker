type deliveryType = number[]
type DeliveriesType = deliveryType[]

type pathType = number[]

type errorType =
  | {
      status: "error"
      error_code:
        | "delivery_address_not_in_path"
        | "delivery_dropoff_before_pickup"
      error_message: string
    }
  | false

export function checkDelivery(deliveries: DeliveriesType, path: pathType) {
  let error: errorType = false

  const newDeliveryCheckObj = deliveries.map((delivery: deliveryType) => {
    const newDeliveryList = delivery.map((d, index) => {
      return {
        type: index === 0 ? "pickup" : "dropoff",
        id: d,
        position: path.findIndex((p) => p === d),
      }
    })

    return newDeliveryList
  })

  //check if a dropoff happens before pickup
  newDeliveryCheckObj.forEach((newDelCheckElement) => {
    const pickup = newDelCheckElement[0]
    const dropoff = newDelCheckElement[1]

    if (pickup.position < 0 || dropoff.position < 0) {
      error = {
        status: "error",
        error_code: "delivery_address_not_in_path",
        error_message: "Erreur : une adresse inconnue...",
      }
    } else if (pickup.position > dropoff.position) {
      error = {
        status: "error",
        error_code: "delivery_dropoff_before_pickup",
        error_message:
          "Erreur : une adresse de dépôt se trouve avant son adresse de récupération",
      }
    }

    return error
  })

  if (error) return error
  else {
    return {
      status: "success",
      steps: path.map((p) => {
        const action = newDeliveryCheckObj
          .map(
            (newDeliveryCheckElement) =>
              newDeliveryCheckElement.find((elem) => elem.id === p)?.type
          )
          .find((elem) => elem)

        return {
          address: p,
          action: action || null,
        }
      }),
    }
  }
}
