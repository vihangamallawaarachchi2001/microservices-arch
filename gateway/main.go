package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"path"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load environment variables
	

	// Services
	authService := "http://localhost:3001"
	userService := "http://localhost:3002"
	hotelService := "http://localhost:3003"
	reviewService := "http://localhost:3004"
	orderService := "http://localhost:3005"
	paymentService := "http://localhost:3006"
	notificationService := "http://localhost:3007"
	searchService := "http://localhost:3008"

	// Create router
	r := gin.Default()

	// CORS config (adjust origin to match frontend port)
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5003", "http://localhost:5001", "http://localhost:5002"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(corsConfig))

	// Route definitions
	r.Any("/api/auth/*path", func(c *gin.Context) {
		proxyRequest(authService, "/api/auth", c)
	})

	r.Any("/api/users/*path", func(c *gin.Context) {
		proxyRequest(userService, "/api/users", c)
	})

	r.Any("/api/drivers/*path", func(c *gin.Context) {
		proxyRequest(userService, "/api/drivers", c)
	})

	r.Any("/api/hotelOwners/*path", func(c *gin.Context) {
		proxyRequest(userService, "/api/hotelOwners", c)
	})

	r.Any("/api/hotel/*path", func(c *gin.Context) {
		proxyRequest(hotelService, "/api/hotel", c)
	})

	r.Any("/api/review/*path", func(c *gin.Context) {
		proxyRequest(reviewService, "/api/review", c)
	})

	r.Any("/order/*path", func(c *gin.Context) {
		proxyRequest(orderService, "/order", c)
	})

	r.Any("/api/payment/*path", func(c *gin.Context) {
		proxyRequest(paymentService, "/api/users", c)
	})

	r.Any("/api/notification/*path", func(c *gin.Context) {
		proxyRequest(notificationService, "/api/users", c)
	})

	r.Any("/api/search/*path", func(c *gin.Context) {
		proxyRequest(searchService, "/api/users", c)
	})

	// Run server on port 3000
	r.Run(":3000")
}

// Proxies incoming requests to the target service
func proxyRequest(target string, prefix string, c *gin.Context) {
	// if c.Request.Method == http.MethodOptions {
	// 	c.Status(http.StatusOK)
	// 	return
	// }

	remote, err := url.Parse(target)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse target URL"})
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(remote)

	proxy.Director = func(req *http.Request) {
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
		req.URL.Path = path.Join(prefix, c.Param("path"))
		req.Host = remote.Host

		// Copy headers safely
		req.Header = make(http.Header)
		for key, values := range c.Request.Header {
			for _, value := range values {
				req.Header.Add(key, value)
			}
		}
	}

	proxy.ServeHTTP(c.Writer, c.Request)
}
