package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type DeliveryRequest struct {
    Address string `json:"address"`
}

func main() {
    http.HandleFunc("/deliver", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
            return
        }

        var req DeliveryRequest
        err := json.NewDecoder(r.Body).Decode(&req)
        if err != nil {
            http.Error(w, "Invalid request body", http.StatusBadRequest)
            return
        }

        fmt.Fprintf(w, "Delivery scheduled to: %s", req.Address)
    })

    fmt.Println("Starting Delivery Service on port 4000 -> 4001 host...")
    http.ListenAndServe(":4000", nil)
}