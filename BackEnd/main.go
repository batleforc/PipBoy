package main

import (
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	model "pipboy/Model"

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
		externalToken := helper.ParseTokenHeader(c.Request().Header.Get("Authorization"))
		keyClient := model.KeyClient{}
		rptToken, err := keyClient.GetRetrospectToken(externalToken)
		if err != nil {
			fmt.Printf("An error has been encountered, %s", err.Error())
		}
		fmt.Print(rptToken.String())
		type Retour struct {
			Truc      bool `json:"name"`
			Rpt       gocloak.RetrospecTokenResult
			Firstname string           `json:"FirstName"`
			Lastname  string           `json:"LastName"`
			Username  string           `json:"UserName"`
			UserInfo  gocloak.UserInfo `json:"UserInfo"`
		}
		user, _ := keyClient.GetUserInfoFromToken(externalToken)
		fmt.Print(user)
		fmt.Print(*user.PreferredUsername)
		return c.JSON(http.StatusOK, Retour{Truc: !*rptToken.Active, Rpt: rptToken, Firstname: *user.GivenName, Lastname: *user.FamilyName, Username: *user.PreferredUsername, UserInfo: *user})
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", helper.GetStringEnv("PORT", "3001"))))
}
