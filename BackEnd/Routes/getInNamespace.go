package routes

import (
	"context"
	"fmt"
	"net/http"
	helper "pipboy/Helper"
	model "pipboy/Model"

	appsv1 "k8s.io/api/apps/v1"
	v1 "k8s.io/api/core/v1"
	netv1 "k8s.io/api/networking/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/labstack/echo/v4"
)

type retourInNamespace struct {
	Pod            *v1.PodList
	PVC            *v1.PersistentVolumeClaimList
	Deployment     *appsv1.DeploymentList
	Service        *v1.ServiceList
	Ingress        *netv1.IngressList
	ConfigMap      *v1.ConfigMapList
	Secret         *v1.SecretList
	ResourceQuotas *v1.ResourceQuotaList
}

func GetInNamespace(c echo.Context) error {
	externalToken := c.Get("Token").(string)
	keyClient := c.Get("Auth").(model.Auth)
	_, err := keyClient.GetRetrospectToken(externalToken)
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
	namespaceName := helper.GetNamespaceName(*userInfo)
	pod, err := clientSet.CoreV1().Pods(namespaceName).List(context.TODO(), metav1.ListOptions{})
	PVC, err1 := clientSet.CoreV1().PersistentVolumeClaims(namespaceName).List(context.TODO(), metav1.ListOptions{})
	Service, err2 := clientSet.CoreV1().Services(namespaceName).List(context.TODO(), metav1.ListOptions{})
	ConfigMap, err3 := clientSet.CoreV1().ConfigMaps(namespaceName).List(context.TODO(), metav1.ListOptions{})
	Secrets, err4 := clientSet.CoreV1().Secrets(namespaceName).List(context.TODO(), metav1.ListOptions{})
	ResourceQuotas, err5 := clientSet.CoreV1().ResourceQuotas(namespaceName).List(context.TODO(), metav1.ListOptions{})
	Deployment, err6 := clientSet.AppsV1().Deployments(namespaceName).List(context.TODO(), metav1.ListOptions{})
	Ingress, err7 := clientSet.NetworkingV1().Ingresses(namespaceName).List(context.TODO(), metav1.ListOptions{})
	if err != nil || err1 != nil || err2 != nil || err3 != nil || err4 != nil || err5 != nil || err6 != nil || err7 != nil {
		fmt.Printf("An error has been encountered, err : %s, err1: %s,err2: %s, err3: %s, err4 :%s, err5 : %s, err6 : %s, err7: %s", err, err1, err2, err3, err4, err5, err6, err7)
		return err
	}
	return c.JSON(http.StatusOK, retourInNamespace{Pod: pod, PVC: PVC, Service: Service, ConfigMap: ConfigMap, Secret: Secrets, ResourceQuotas: ResourceQuotas, Deployment: Deployment, Ingress: Ingress})
}
