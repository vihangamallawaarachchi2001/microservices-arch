package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type PaymentRequest struct {
    Amount float64 `json:"amount"`
}

func main() {
    http.HandleFunc("/pay", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
            return
        }

        var req PaymentRequest
        err := json.NewDecoder(r.Body).Decode(&req)
        if err != nil {
            http.Error(w, "Invalid request body", http.StatusBadRequest)
            return
        }

        fmt.Fprintf(w, "Payment successful for amount: %.2f", req.Amount)
    })

    fmt.Println("Starting Payment Service on port 4000 -> 4000 host...")
    http.ListenAndServe(":4000", nil)
}