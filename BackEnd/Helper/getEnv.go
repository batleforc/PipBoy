package helper

import (
	"os"
	"strconv"
)

func GetStringEnv(label string, defaultValue string) string {
	if val := os.Getenv(label); val != "" {
		return val
	}
	return defaultValue
}

func GetIntEnv(label string, defaultValue string) int {
	val := GetStringEnv(label, defaultValue)
	if i, err := strconv.Atoi(val); err != nil {
		return i
	}
	return -1
}
