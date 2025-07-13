import { checkDelivery } from "../logic/deliveryChecker"

const deliveries = [
  [1, 3],
  [2, 5],
]
const path = [1, 2, 3, 4, 5]

const result = checkDelivery(deliveries, path)
console.log(JSON.stringify(result, null, 2))
