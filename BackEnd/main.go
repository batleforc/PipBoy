package main

import (
	"context"
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	"strings"

	"github.com/Nerzal/gocloak/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${remote_ip} : ${time_rfc3339_nano}] ${status} : ${method} => ${uri}\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001", "http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAuthorization, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {
		externalToken := c.Request().Header.Get("Authorization")
		client := gocloak.NewClient(helper.GetStringEnv("OIDC_HOSTNAME", "https://auth.weebo.fr"))
		ctx := context.Background()
		externalToken = strings.Replace(externalToken, "Bearer", "", -1)
		externalToken = strings.Trim(externalToken, " ")
		clientId := helper.GetStringEnv("OIDC_CLIENTID", "pipboy")
		clientSecret := helper.GetStringEnv("OIDC_CLIENTSECRET", "5a161e19-2d93-4860-9927-06097a824814")
		clientRealm := helper.GetStringEnv("OIDC_REALM", "MasterKluster")
		rptToken, err := client.RetrospectToken(ctx, externalToken, clientId, clientSecret, clientRealm)
		if err != nil {
			fmt.Printf("An error has been encountered, %s", err.Error())
		}
		//fmt.Print(rptToken.Active)
		fmt.Print(rptToken.String())
		type Retour struct {
			Truc bool `json:"name"`
			rpt  gocloak.RetrospecTokenResult
		}
		return c.JSON(http.StatusOK, Retour{Truc: !*rptToken.Active, rpt: *rptToken})
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", helper.GetStringEnv("PORT", "3001"))))
}
