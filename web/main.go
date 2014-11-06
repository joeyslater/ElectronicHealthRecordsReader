package main

import (
    "fmt"
    "net/http"
)

func init() {
    http.HandleFunc("/test", handler)
    http.HandleFunc("/marla", getMarla)
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, world!")
}

func getMarla(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, world!")
}

