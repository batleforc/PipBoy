package model

import (
	"log"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type K8sHandler struct {
	config rest.Config
}

func (v *K8sHandler) InitInCluster() *K8sHandler {
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Print("K8S : Error while creating k8s in cluster configuration")
	}
	v.config = *config

	return v
}

func (v *K8sHandler) GetClientSet() (*kubernetes.Clientset, error) {
	return kubernetes.NewForConfig(&v.config)
}
