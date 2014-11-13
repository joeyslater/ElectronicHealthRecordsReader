package main

import (
	"appengine"
	"appengine/datastore"
	"bytes"
	"code.google.com/p/go.crypto/pbkdf2"
	"crypto/sha256"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"gatech.edu/jslater3/ccd"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

func init() {
	http.HandleFunc("/marla", getMarla)
	http.HandleFunc("/auth", login)
	http.HandleFunc("/register", register)
}

func main() {}

type User struct {
	Username  string `json: "username"`
	Password  []byte `json: "password, omitempty"`
	FirstName string `json: "firstName"`
	LastName  string `json: "lastName"`
	Role      string `json: "role"`
}

func register(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	var newUser User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&newUser)

	if err != nil {
		panic(err)
	}

	if strings.TrimSpace(newUser.Role) == "" {
		newUser.Role = "patient"
	}

	q := datastore.NewQuery("User").Filter("Username =", newUser.Username)
	var users []User
	q.GetAll(c, &users)

	if len(users) > 0 {
		fmt.Fprintf(w, "%s", "Duplicate Users")
	} else {
		encryptedPassword := HashPassword(newUser.Password)

		if err != nil {
			panic(err)
		}

		newUser.Password = encryptedPassword
		_, err := datastore.Put(c, datastore.NewIncompleteKey(c, "User", nil), &newUser)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		newUser.Password = nil
		json_user, err := json.Marshal(newUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write(json_user)
	}
}

func clear(b []byte) {
	for i := 0; i < len(b); i++ {
		b[i] = 0
	}
}

func HashPassword(password []byte) []byte {
	defer clear(password)
	return pbkdf2.Key(password, []byte("superman"), 4096, sha256.Size, sha256.New)
}

func login(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	var newUser User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&newUser)

	if err != nil {
		panic(err)
	}

	q := datastore.NewQuery("User").Filter("Username =", newUser.Username)
	var users []User
	q.GetAll(c, &users)

	if len(users) > 0 {
		encryptedPassword := HashPassword(newUser.Password)

		if err != nil {
			panic(err)
		}

		newUser.Password = encryptedPassword
		passwordToCheck := users[0].Password
		fmt.Fprintln(w, newUser.Password)
		fmt.Fprintln(w, passwordToCheck)

		if bytes.Equal(passwordToCheck, encryptedPassword) {
			fmt.Fprintln(w, "Logged In")
		} else {
			fmt.Fprintln(w, "Not Logged In")
		}
	} else {
		fmt.Fprintln(w, "Nog Logged In")
	}

}

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
