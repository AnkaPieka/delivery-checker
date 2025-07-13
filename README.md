# React + TypeScript + Vite

---

## 📦 Delivery Checker

Small algorithmic + frontend exercise to validate delivery steps based on a truck path.

---

### 🧠 Part 1 – Algorithm

This project includes a pure function `checkDelivery()` that verifies whether all delivery steps are valid based on:

* A list of delivery pairs (pickup → dropoff)
* A list of addresses visited by a truck

It returns a structured JSON result or an error message with precise diagnostics.

---

### 💻 Part 2 – Web UI

A minimal React + Tailwind interface allows you to:

* Input deliveries and path as JSON
* Run the algorithm interactively
* View the results as a timeline and table

---

## 🚀 Getting started

### ✅ Prerequisites

* Node.js ≥ 18
* npm ≥ 9

---

### 🛠️ Installation

```bash
git clone https://github.com/AnkaPieka/delivery-checker.git
cd delivery-checker
npm install
```

---

### ▶️ Run the UI

```bash
npm run dev
```

Open [http://localhost:5173] to view the interface in your browser.

---

### 🧪 Run the algorithm manually (CLI test)

You can test the algorithm directly using `ts-node`:

```bash
npx ts-node src/logic/test.ts
```

Or create your own test file in `src/logic/` and import `checkDelivery`.

---

## 📁 Project structure

```bash
/src
  /components    # Reusable React components
    /ui            # Reusable base element Card
  /logic         # Algorithm, types and tests
```

---

## 🧾 Example input format

```json
deliveries: [[1,3], [2,5]]
path: [1,2,3,4,5]
```

The function ensures all pickups happen before their dropoffs, and all delivery addresses exist in the path.

---

## ✅ Output format

```json
{
  "status": "success",
  "steps": [
    { "address": 1, "action": "pickup" },
    { "address": 2, "action": "pickup" },
    { "address": 3, "action": "dropoff" },
    { "address": 4, "action": null },
    { "address": 5, "action": "dropoff" }
  ]
}
```

Errors are printed in this format:

```json
{
  "status": "error",
  "error_code": "delivery_dropoff_before_pickup",
  "error_message": "Dropoff of parcel at address 3 occurs before its pickup at 1."
}
```

---

## 🧼 Code quality

* TypeScript strict mode enabled
* Fully typed algorithm
* Tailwind for UI consistency

---
