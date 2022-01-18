package main

import (
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	model "pipboy/Model"
	routes "pipboy/Routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	keyClient := model.Auth{}
	e := echo.New()
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${remote_ip} : ${time_rfc3339_nano}] ${status} : ${method} => ${uri}\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: helper.GetStringArrayEnv("ALLOW_ORIGIN", ",", "http://localhost:3000,http://localhost:3001"),
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAuthorization, echo.HeaderAccept},
	}))

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			externalToken := helper.ParseTokenHeader(c.Request().Header.Get("Authorization"))
			rptToken, err := keyClient.GetRetrospectToken(externalToken)
			if err == nil && *rptToken.Active {
				c.Set("Auth", keyClient)
				c.Set("Token", externalToken)
				return next(c)
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "")
		}
	})

	e.GET("/", routes.GetStatus)
	e.GET("/inNamespace", routes.GetInNamespace)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", helper.GetStringEnv("PORT", "3001"))))
}
