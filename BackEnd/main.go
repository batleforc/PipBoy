package main

import (
	"context"
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	model "pipboy/Model"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func main() {
	e := echo.New()
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${remote_ip} : ${time_rfc3339_nano}] ${status} : ${method} => ${uri}\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: helper.GetStringArrayEnv("ALLOW_ORIGIN", ",", "http://localhost:3000,http://localhost:3001"),
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAuthorization, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {
		externalToken := helper.ParseTokenHeader(c.Request().Header.Get("Authorization"))
		keyClient := model.Auth{}
		rptToken, err := keyClient.GetRetrospectToken(externalToken)
		if err != nil {
			fmt.Printf("An error has been encountered, %s", err.Error())
			return err
		}
		kube := model.K8sHandler{}
		clientSet, err := kube.InitOutCluster().GetClientSet()
		if err != nil {
			fmt.Printf("An error has been encountered, %s", err.Error())
			return err
		}
		userInfo, _ := keyClient.GetUserInfoFromToken(externalToken)
		namespace, err := clientSet.CoreV1().Namespaces().Get(context.TODO(), helper.GetNamespaceName(*userInfo), metav1.GetOptions{})
		if err != nil {
			fmt.Printf("An error has been encountered, %s", err.Error())
			return err
		}
		type Retour struct {
			CanStillWork   bool
			NamespaceExist bool
			NamespaceName  string
		}
		return c.JSON(http.StatusOK, Retour{CanStillWork: *rptToken.Active, NamespaceExist: namespace != nil, NamespaceName: namespace.GetName()})
	})
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", helper.GetStringEnv("PORT", "3001"))))
}
