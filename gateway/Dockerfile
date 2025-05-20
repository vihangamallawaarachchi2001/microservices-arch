# --- Builder Stage ---
FROM golang:1.24 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /gateway

# --- Final Stage ---
FROM gcr.io/distroless/static-debian12

COPY --from=builder /gateway /gateway


EXPOSE 3000

CMD ["/gateway"]