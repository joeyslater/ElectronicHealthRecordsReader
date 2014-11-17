package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"gatech.edu/jslater3/auth"
	"gatech.edu/jslater3/ccd"
	"io/ioutil"
	"net/http"
	"os"
)

func init() {
	http.HandleFunc("/marla", getMarla)
	http.HandleFunc("/auth", auth.Login)
	http.HandleFunc("/register", auth.Register)
}

func main() {}

func getMarla(w http.ResponseWriter, r *http.Request) {

	xmlFile, err := os.Open("output.xml")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer xmlFile.Close()
	b, _ := ioutil.ReadAll(xmlFile)

	var doc ccd.ClinicalDocument
	xml.Unmarshal(b, &doc)

	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(doc)
	fmt.Fprintf(w, "%s", json_msg)
}
