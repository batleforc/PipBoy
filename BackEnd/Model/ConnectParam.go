package model

import (
	"context"
	helper "pipboy/Helper"

	"github.com/Nerzal/gocloak/v10"
)

type KeyClient struct {
	clientId     string
	clientSecret string
	clientRealm  string
	hostName     string
	client       gocloak.GoCloak
}

func (v *KeyClient) Init() KeyClient {
	v.clientId = helper.GetStringEnv("OIDC_CLIENTID", "pipboy")
	v.clientSecret = helper.GetStringEnv("OIDC_CLIENTSECRET", "5a161e19-2d93-4860-9927-06097a824814")
	v.clientRealm = helper.GetStringEnv("OIDC_REALM", "MasterKluster")
	v.hostName = helper.GetStringEnv("OIDC_HOSTNAME", "https://auth.weebo.fr")
	v.client = gocloak.NewClient(v.hostName)
	return *v
}

func (v *KeyClient) GetRetrospectToken(token string) (gocloak.RetrospecTokenResult, error) {
	if v.client == nil {
		v.Init()
	}
	ctx := context.Background()
	rptToken, err := v.client.RetrospectToken(ctx, token, v.clientId, v.clientSecret, v.clientRealm)
	return *rptToken, err
}

func (v *KeyClient) GetUserInfoFromToken(token string) (*gocloak.UserInfo, error) {
	if v.client == nil {
		v.Init()
	}
	ctx := context.Background()
	return v.client.GetUserInfo(ctx, token, v.clientRealm)
}
