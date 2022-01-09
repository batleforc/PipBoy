package main

import (
	"fmt"
	"net/http"
	helper "pipboy/Helper"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${remote_ip} : ${time_rfc3339_nano}] ${status} : ${method} => ${uri}\n",
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World")
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", helper.GetStringEnv("PORT", "3001"))))
}
