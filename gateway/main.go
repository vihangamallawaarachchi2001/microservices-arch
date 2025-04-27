package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	
	r := gin.Default()

	err := godotenv.Load()
    if err != nil {
        panic("Error loading .env file")
    }

	env := os.Getenv("ENV")
    if env == "" {
        env = "development"
    }

	authService := os.Getenv("AUTH_SERVICE")
	userService := os.Getenv("USER_SERVICE")
    hotelService := os.Getenv("HOTEL_SERVICE")
    reviewService := os.Getenv("REVIEW_SERVICE")
    orderService := os.Getenv("ORDER_SERVICE")
    paymentService := os.Getenv("PAYMENT_SERVICE")
    notificationService := os.Getenv("NOTIFICATION_SERVICE")
    searchService := os.Getenv("SEARCH_SERVICE")

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5001", "http://localhost:5002", "http://localhost:5003"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true

	r.Use(cors.New(config))

	r.Any("/api/auth/*path", func(c *gin.Context) {
		proxyRequest(authService, c)
	})

	r.Any("/api/user/*path", func(c *gin.Context) {
        proxyRequest(userService, c)
    })

    r.Any("/api/hotel/*path", func(c *gin.Context) {
        proxyRequest(hotelService, c)
    })

    r.Any("/api/review/*path", func(c *gin.Context) {
        proxyRequest(reviewService, c)
    })

    r.Any("/api/order/*path", func(c *gin.Context) {
        proxyRequest(orderService, c)
    })

    r.Any("/api/payment/*path", func(c *gin.Context) {
        proxyRequest(paymentService, c)
    })

    r.Any("/api/notification/*path", func(c *gin.Context) {
        proxyRequest(notificationService, c)
    })

    r.Any("/api/search/*path", func(c *gin.Context) {
        proxyRequest(searchService, c)
    })

    r.Run(":3000")

}

func proxyRequest(target string, c *gin.Context) {
	remote, err := url.Parse(target)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse target URL"})
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
		req.URL.Path = c.Param("path")
	}

	proxy.ServeHTTP(c.Writer, c.Request)
}