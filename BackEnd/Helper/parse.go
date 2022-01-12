package helper

import (
	"fmt"
	"strings"

	"github.com/Nerzal/gocloak/v10"
)

func ParseTokenHeader(token string) string {
	token = strings.Replace(token, "Bearer", "", -1)
	return strings.Trim(token, " ")
}

func GetNamespaceName(userInfo gocloak.UserInfo) string {
	firstName := *userInfo.GivenName
	lastName := *userInfo.FamilyName
	return fmt.Sprintf("%s%s%s", GetStringEnv("NAMESPACE_PREFIX", "mk-"), firstName[0:1], lastName)
}
