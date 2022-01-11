package helper

import "strings"

func ParseTokenHeader(token string) string {
	token = strings.Replace(token, "Bearer", "", -1)
	return strings.Trim(token, " ")
}
