package routes

import (
	"context"
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	model "pipboy/Model"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/labstack/echo/v4"
)

type Retour struct {
	CanStillWork   bool
	NamespaceExist bool
	NamespaceName  string
}

func GetStatus(c echo.Context) error {
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
	return c.JSON(http.StatusOK, Retour{CanStillWork: *rptToken.Active, NamespaceExist: namespace != nil, NamespaceName: namespace.GetName()})
}
