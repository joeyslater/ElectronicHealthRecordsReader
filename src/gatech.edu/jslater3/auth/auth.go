package auth

import (
	"appengine"
	"appengine/datastore"
	"bytes"
	"code.google.com/p/go.crypto/pbkdf2"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"github.com/gorilla/sessions"
	"net/http"
	"strings"
)

var store = sessions.NewCookieStore([]byte("5s0yg3or07zpmquscsma"))

func init() {
	store.Options = &sessions.Options{
		Domain:   "localhost",
		Path:     "/",
		MaxAge:   3600 * .1, // 8 hours
		HttpOnly: true,
	}
}

func Register(w http.ResponseWriter, r *http.Request) {
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

func Clear(b []byte) {
	for i := 0; i < len(b); i++ {
		b[i] = 0
	}
}

func HashPassword(password []byte) []byte {
	defer Clear(password)
	return pbkdf2.Key(password, []byte("superman"), 4096, sha256.Size, sha256.New)
}

func Login(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	var newUser User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&newUser)

	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
	}

	q := datastore.NewQuery("User").Filter("Username =", newUser.Username)
	var users []User
	q.GetAll(c, &users)

	if len(users) > 0 {
		encryptedPassword := HashPassword(newUser.Password)
		passwordToCheck := users[0].Password

		if bytes.Equal(passwordToCheck, encryptedPassword) {
			newUser = users[0]
			Clear(newUser.Password)
			newUser.Password = nil

			session, _ := store.Get(r, "session")
			session.Values["username"] = newUser.Username
			session.Values["role"] = newUser.Role
			session.Save(r, w)

			json_msg, _ := json.Marshal(newUser)
			fmt.Fprintf(w, "%s", json_msg)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}

}
