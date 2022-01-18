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

type retourInStatus struct {
	CanStillWork   bool
	NamespaceExist bool
	NamespaceName  string
	AccountPanel   string
	Message        string
}

func GetStatus(c echo.Context) error {
	externalToken := c.Get("Token").(string)
	keyClient := c.Get("Auth").(model.Auth)
	rptToken, err := keyClient.GetRetrospectToken(externalToken)
	if err != nil {
		fmt.Printf("An error has been encountered, %s", err.Error())
		return err
	}
	if !*rptToken.Active {
		return c.JSON(http.StatusUnauthorized, retourInStatus{Message: "YOU SOULD NOT PASS"})
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
	return c.JSON(http.StatusOK, retourInStatus{CanStillWork: *rptToken.Active, NamespaceExist: namespace != nil, NamespaceName: namespace.GetName(), AccountPanel: fmt.Sprintf("%s/auth/realms/%s/account", keyClient.HostName, keyClient.ClientRealm)})
}
