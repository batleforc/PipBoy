package model

import (
	"context"
	helper "pipboy/Helper"

	"github.com/Nerzal/gocloak/v10"
)

type Auth struct {
	ClientId     string
	clientSecret string
	ClientRealm  string
	HostName     string
	client       gocloak.GoCloak
}

func (v *Auth) Init() Auth {
	v.ClientId = helper.GetStringEnv("OIDC_CLIENTID", "pipboy")
	v.clientSecret = helper.GetStringEnv("OIDC_CLIENTSECRET", "5a161e19-2d93-4860-9927-06097a824814")
	v.ClientRealm = helper.GetStringEnv("OIDC_REALM", "MasterKluster")
	v.HostName = helper.GetStringEnv("OIDC_HOSTNAME", "https://auth.weebo.fr")
	v.client = gocloak.NewClient(v.HostName)
	return *v
}

func (v *Auth) GetRetrospectToken(token string) (gocloak.RetrospecTokenResult, error) {
	if v.client == nil {
		v.Init()
	}
	ctx := context.Background()
	rptToken, err := v.client.RetrospectToken(ctx, token, v.ClientId, v.clientSecret, v.ClientRealm)
	return *rptToken, err
}

func (v *Auth) GetUserInfoFromToken(token string) (*gocloak.UserInfo, error) {
	if v.client == nil {
		v.Init()
	}
	ctx := context.Background()
	return v.client.GetUserInfo(ctx, token, v.ClientRealm)
}

func (v *Auth) IsTokenValid(token string) bool {
	rptToken, err := v.GetRetrospectToken(token)
	if err != nil {
		return false
	}
	return *rptToken.Active
}
