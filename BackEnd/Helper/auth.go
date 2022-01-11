package helper

import (
	"context"
	"strings"

	"github.com/Nerzal/gocloak/v10"
)

func GetKeyCloakClient() gocloak.GoCloak {
	return gocloak.NewClient(GetStringEnv("OIDC_HOSTNAME", "https://auth.weebo.fr"))
}

func ParseTokenHeader(token string) string {
	token = strings.Replace(token, "Bearer", "", -1)
	return strings.Trim(token, " ")
}

func GetRetrospectToken(token string) (gocloak.RetrospecTokenResult, error) {
	client := GetKeyCloakClient()
	return GetRetrospectTokenWithClient(token, client)
}

func GetRetrospectTokenWithClient(token string, client gocloak.GoCloak) (gocloak.RetrospecTokenResult, error) {
	ctx := context.Background()
	clientId := GetStringEnv("OIDC_CLIENTID", "pipboy")
	clientSecret := GetStringEnv("OIDC_CLIENTSECRET", "5a161e19-2d93-4860-9927-06097a824814")
	clientRealm := GetStringEnv("OIDC_REALM", "MasterKluster")
	rptToken, err := client.RetrospectToken(ctx, token, clientId, clientSecret, clientRealm)
	return *rptToken, err
}
