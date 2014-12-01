package main

import (
	"appengine"
	"appengine/blobstore"
	"appengine/datastore"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"gatech.edu/jslater3/auth"
	"gatech.edu/jslater3/ccd"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"strconv"
)

func init() {
	r := mux.NewRouter()

	r.HandleFunc("/marla", getMarla)
	r.HandleFunc("/auth", auth.Login).Methods("post")
	r.HandleFunc("/register", auth.Register).Methods("post")
	r.HandleFunc("/logout", auth.Logout)

	// Users
	r.HandleFunc("/users", GetUsers)
	r.HandleFunc("/patients", GetPatients)

	r.HandleFunc("/user", UpdateUser).Methods("put")
	s := r.PathPrefix("/user").Subrouter()
	s.HandleFunc("", UpdateUser).Methods("put")
	s.HandleFunc("/", UpdateUser).Methods("put")
	s.HandleFunc("/{id}", DeleteUser).Methods("delete")
	s.HandleFunc("/{id}/", DeleteUser).Methods("delete")

	r.HandleFunc("/favicon.ico", ServeFileHandler)
	r.HandleFunc("/robots.txt", ServeFileHandler)
	r.HandleFunc("/upload", UploadHandler)

	r.HandleFunc("/uploadProf", UploadProf)
	r.HandleFunc("/profpic", UploadProfPicHandler)
	r.HandleFunc("/profpic/{id}", GetProfPicHandler).Methods("get")

	r.HandleFunc("/uploadCcd", UploadCcd)
	r.HandleFunc("/ccd", UploadCcdHandler)
	r.HandleFunc("/ccd/{id}", GetCcdHandler).Methods("get")
	r.HandleFunc("/quickCcd", QuickCcd)
	r.HandleFunc("/quickccd", UploadQuickCcdHandler)
	r.HandleFunc("/quickccd/{id}", GetQuickCcdHandler).Methods("get")

	http.Handle("/", r)
}

func ServeFileHandler(w http.ResponseWriter, r *http.Request) {
	fname := path.Base(r.URL.Path)
	fmt.Fprintf(w, "%s", "./gui/target/assets/"+fname)
	http.ServeFile(w, r, "./gui/target/assets/"+fname)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	q := datastore.NewQuery("User")
	var users []auth.User

	keys, err := q.GetAll(c, &users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		users[i].Id = key.IntID()
		// bkey, _ := blobstore.BlobKeyForFile(c, "/assets/images/blank-prof.png")
		// users[i].ProfilePic = bkey
		// users[i].Ccd = bkey

		// key := datastore.NewKey(c, "User", "", users[i].Id, nil)
		// datastore.Put(c, key, &users[i])
	}
	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(users)
	fmt.Fprintf(w, "%s", json_msg)
}
func GetPatients(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	q := datastore.NewQuery("User").Filter("Role = ", "patient")
	var users []auth.User

	keys, err := q.GetAll(c, &users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		users[i].Id = key.IntID()
	}
	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(users)
	fmt.Fprintf(w, "%s", json_msg)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	var userToUpdate auth.User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&userToUpdate)

	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
	}

	key := datastore.NewKey(c, "User", "", userToUpdate.Id, nil)

	var oldUser auth.User
	datastore.Get(c, key, &oldUser)

	userToUpdate.Password = oldUser.Password
	datastore.Put(c, key, &userToUpdate)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	intKey, err := strconv.ParseInt(mux.Vars(r)["id"], 10, 64)

	if err == nil {
		key := datastore.NewKey(c, "User", "", intKey, nil)
		datastore.Delete(c, key)
	}

}

func UploadHandler(res http.ResponseWriter, req *http.Request) {

	var (
		status int
		err    error
	)

	defer func() {
		if nil != err {
			http.Error(res, err.Error(), status)
		}
	}()

	// parse request
	const _24K = (1 << 20) * 24
	if err = req.ParseMultipartForm(_24K); nil != err {
		status = http.StatusInternalServerError
		return
	}

	for _, fheaders := range req.MultipartForm.File {
		for _, hdr := range fheaders {

			// open uploaded
			var infile multipart.File
			if infile, err = hdr.Open(); nil != err {
				status = http.StatusInternalServerError
				return
			}

			// open destination
			var outfile *os.File

			if outfile, err = os.Create("./ccds/" + hdr.Filename); nil != err {
				status = http.StatusInternalServerError
				return
			}

			// 32K buffer copy
			var written int64
			if written, err = io.Copy(outfile, infile); nil != err {
				status = http.StatusInternalServerError
				return
			}

			res.Write([]byte("uploaded file:" + hdr.Filename + ";length:" + strconv.Itoa(int(written))))
		}
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

func serveError(c appengine.Context, w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusInternalServerError)
	fmt.Fprintf(w, "%s", err)
	w.Header().Set("Content-Type", "text/plain")
	io.WriteString(w, "Internal Server Error")
	c.Errorf("%v", err)
}

func UploadProf(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	test, _ := blobstore.UploadURL(c, "/profpic", nil)
	fmt.Fprintf(w, "%s", test)
	w.Header().Set("Content-Type", "text/html")
}

func UploadProfPicHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	blobs, others, err := blobstore.ParseUpload(r)
	if err != nil {
		c.Errorf("Issue")
		return
	}

	file := blobs["file"]
	if len(file) == 0 {
		c.Errorf("No File Uploaded")
		return
	}

	intKey, _ := strconv.ParseInt(others["id"][0], 10, 64)
	key := datastore.NewKey(c, "User", "", intKey, nil)

	var user auth.User
	datastore.Get(c, key, &user)
	blobstore.Delete(c, user.ProfilePic)
	user.ProfilePic = file[0].BlobKey

	datastore.Put(c, key, &user)
}

func GetProfPicHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	intKey, _ := strconv.ParseInt(mux.Vars(r)["id"], 10, 64)
	key := datastore.NewKey(c, "User", "", intKey, nil)

	var user auth.User
	datastore.Get(c, key, &user)

	if user.ProfilePic != "" {
		blobstore.Send(w, appengine.BlobKey(string(user.ProfilePic)))
	}
}

func UploadCcd(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	test, _ := blobstore.UploadURL(c, "/ccd", nil)
	fmt.Fprintf(w, "%s", test)
	w.Header().Set("Content-Type", "text/html")
}

func UploadCcdHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	blobs, others, err := blobstore.ParseUpload(r)
	if err != nil {
		c.Errorf("Issue")
		return
	}

	file := blobs["file"]
	if len(file) == 0 {
		c.Errorf("No File Uploaded")
		return
	}

	intKey, _ := strconv.ParseInt(others["id"][0], 10, 64)
	key := datastore.NewKey(c, "User", "", intKey, nil)

	var user auth.User
	datastore.Get(c, key, &user)
	blobstore.Delete(c, user.Ccd)
	user.Ccd = file[0].BlobKey

	datastore.Put(c, key, &user)
}

func GetCcdHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	intKey, _ := strconv.ParseInt(mux.Vars(r)["id"], 10, 64)
	key := datastore.NewKey(c, "User", "", intKey, nil)

	var user auth.User
	datastore.Get(c, key, &user)

	var ccd ccd.ClinicalDocument
	reader := blobstore.NewReader(c, user.Ccd)
	decoder := xml.NewDecoder(reader)
	decoder.Decode(&ccd)

	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(ccd)
	fmt.Fprintf(w, "%s", json_msg)
}

func QuickCcd(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	test, _ := blobstore.UploadURL(c, "/quickccd", nil)
	fmt.Fprintf(w, "%s", test)
	w.Header().Set("Content-Type", "text/html")
}

func UploadQuickCcdHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	blobs, _, err := blobstore.ParseUpload(r)
	if err != nil {
		c.Errorf("Issue")
		return
	}

	file := blobs["file"]
	if len(file) == 0 {
		c.Errorf("No File Uploaded")
		return
	}

	var ccd ccd.ClinicalDocument
	reader := blobstore.NewReader(c, file[0].BlobKey)
	decoder := xml.NewDecoder(reader)
	decoder.Decode(&ccd)

	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(ccd)
	fmt.Fprintf(w, "%s", json_msg)

	blobstore.Delete(c, file[0].BlobKey)
}

func GetQuickCcdHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	intKey, _ := strconv.ParseInt(mux.Vars(r)["id"], 10, 64)
	key := datastore.NewKey(c, "User", "", intKey, nil)

	var user auth.User
	datastore.Get(c, key, &user)

	var ccd ccd.ClinicalDocument
	reader := blobstore.NewReader(c, user.Ccd)
	decoder := xml.NewDecoder(reader)
	decoder.Decode(&ccd)

	w.Header().Set("Content-Type", "application/json")
	json_msg, _ := json.Marshal(ccd)
	fmt.Fprintf(w, "%s", json_msg)
}
