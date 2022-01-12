package model

import (
	"log"
	helper "pipboy/Helper"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

type K8sHandler struct {
	config rest.Config
}

func (v *K8sHandler) InitInCluster() *K8sHandler {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Printf("K8S : Error while creating k8s in cluster configuration, %s", err.Error())
	}
	v.config = *config

	return v
}

func (v *K8sHandler) InitOutCluster() *K8sHandler {
	config, err := clientcmd.BuildConfigFromFlags("", helper.GetStringEnv("K8SCONFIG", "C:\\Users\\Maxime\\.kube\\config"))
	if err != nil {
		log.Printf("K8S : Error while creating k8s in cluster configuration, %s", err.Error())
	}
	v.config = *config
	return v
}

func (v *K8sHandler) GetClientSet() (*kubernetes.Clientset, error) {
	return kubernetes.NewForConfig(&v.config)
}
