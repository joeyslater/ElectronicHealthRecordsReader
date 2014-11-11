package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"appengine"
	"appengine/datastore"
)

func init() {
	http.HandleFunc("/marla", getMarla)
	http.HandleFunc("/auth", login)
	//http.HandleFunc("/register", register)
}

type User struct {
	Username  string `json: "username"`
	Password  string
	FirstName string `json: "firstName"`
	LastName  string `json: "lastName"`
	Role      string `json: "role"`
}

func login(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	// u := User{
	// 	Username:  "joeyslater",
	// 	Password:  "password",
	// 	FirstName: "Joey",
	// 	LastName:  "Slater",
	// 	Role:      "admin",
	// }

	// key, err := datastore.Put(c, datastore.NewIncompleteKey(c, "user", nil), &u)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// var u2 User
	// if err = datastore.Get(c, key, &u2); err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	qUsers := datastore.NewQuery("user")
	var users []User
	qUsers.GetAll(c, &users)

	//json_msg, err := json.Marshal(u2)

	r.ParseForm()
	fmt.Fprintf(w, "%s", users)
}

func getMarla(w http.ResponseWriter, r *http.Request) {
	xmlFile, err := os.Open("output.xml")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer xmlFile.Close()

	b, _ := ioutil.ReadAll(xmlFile)

	var doc ClinicalDocument
	xml.Unmarshal(b, &doc)

	json_msg, err := json.Marshal(doc)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "%s", json_msg)
}

// type File struct {
// 	Id          bson.ObjectId `bson:"_id"`
// 	PatientName string        `bson:"patientName"`
// 	FileName    string        `bson:"fileName"`
// }

type ClinicalDocument struct {
	RealmCode           Code            `xml:"realmCode" json:"realmCode,omitempty"`
	TypeId              Id              `xml:"typeId" json:"typeId,omitempty"`
	TemplateId          []Id            `xml:"templateId" json:"templateId,omitempty"`
	Id                  Id              `xml:"id" json:"id,omitempty"`
	Code                Code            `xml:"code" json:"code,omitempty"`
	Title               string          `xml:"title" json:"title,omitempty"`
	EffectiveTime       Time            `xml:"effectiveTime" json:"effectiveTime,omitempty"`
	ConfidentialityCode Code            `xml:"confidentialityCode" json:"confidentialityCode,omitempty"`
	LanguageCode        Code            `xml:"languageCode" json:"languageCode,omitempty"`
	RecordTarget        RecordTarget    `xml:"recordTarget" json:"recordTarget,omitempty"`
	Author              Author          `xml:"author" json:"author,omitempty"`
	Custodian           Custodian       `xml:"custodian" json:"custodian,omitempty"`
	DocumentationOf     DocumentationOf `xml:"documentationOf" json:"documentationOf,omitempty"`
	ComponentOf         ComponentOf     `xml:"componentOf" json:"componentOf,omitempty"`
	Component           Component       `xml:"component" json:"component,omitempty"`
}

type Id struct {
	Root      string `xml:"root,attr" json:"root,omitempty"`
	Extension string `xml:"extension,attr" json:"extension,omitempty"`
}

type Code struct {
	Code              string `xml:"code,attr" json:"code,omitempty"`
	CodeSystem        string `xml:"codeSystem,attr" json:"codeSystem,omitempty"`
	CodeSystemName    string `xml:"codeSystemName,attr" json:"codeSystemName,omitempty"`
	DisplayName       string `xml:"displayName,attr" json:"displayName,omitempty"`
	CodeSystemVersion string `xml:"codeSystemVersion,attr" json:"codeSystemVersion,omitempty"`
}

type Time struct {
	Value string `xml:"value,attr" json:"value,omitempty"`
}

type RecordTarget struct {
	PatientRole []PatientRole `xml:"patientRole" json:"patientRole,omitempty"`
}

type PatientRole struct {
	Id      Id      `xml:"id" json:"id,omitempty"`
	Address Address `xml:"addr" json:"addr,omitempty"`
	Telecom Telecom `xml:"telecom" json:"telecom,omitempty"`
	Patient Patient `xml:"patient" json:"patient,omitempty"`
}

type Telecom struct {
	Value string `xml:"value,attr" json:"value,omitempty"`
	Use   string `xml:"use,attr" json:"use,omitempty"`
}

type Address struct {
	Use               string `xml:"use,attr" json:"use,omitempty"`
	StreetAddressLine string `xml:"streetAddressLine" json:"streetAddressLine,omitempty"`
	City              string `xml:"city" json:"city,omitempty"`
	State             string `xml:"state" json:"state,omitempty"`
	PostalCode        string `xml:"postalCode" json:"postalCode,omitempty"`
	Country           string `xml:"country" json:"country,omitempty"`
}

type Patient struct {
	Name                     Name `xml:"name" json:"name,omitempty"`
	AdministrativeGenderCode Code `xml:"administrativeGenderCode" json:"administrativeGenderCode,omitempty"`
	BirthTime                Time `xml:"birthTime" json:"birthTime,omitempty"`
	RaceCode                 Code `xml:"raceCode" json:"raceCode,omitempty"`
	EthnicGroupCode          Code `xml:"ethnicGroupCode" json:"ethnicGroupCode,omitempty"`
}

type Name struct {
	Prefix string `xml:"prefix" json:"prefix,omitempty"`
	Given  string `xml:"given" json:"given,omitempty"`
	Family string `xml:"family" json:"family,omitempty"`
	Suffix string `xml:"suffix" json:"suffix,omitempty"`
}

type Author struct {
	Time           Time           `xml:"time" json:"" json:"time,omitempty"`
	AssignedAuthor AssignedAuthor `xml:"assignedAuthor" json:"assignedAutho,omitemptyr"`
}

type AssignedAuthor struct {
	Id             Id             `xml:"id" json:"id,omitempty"`
	Address        Address        `xml:"addr" json:"addr,omitempty"`
	Telecom        Telecom        `xml:"telecom" json:"telecom,omitempty"`
	AssignedPerson AssignedPerson `xml:"assignedPerson" json:"assignedPerson,omitempty"`
}

type AssignedPerson struct {
	Name Name `xml:"name" json:"name,omitempty"`
}

type Custodian struct {
	AssignedCustodian AssignedCustodian `xml:"assignedCustodian" json:"assignedCustodian,omitempty"`
}

type AssignedCustodian struct {
	RepresentedCustodianOrganization RepresentedCustodianOrganization `xml:"representedCustodianOrganization" json:"representedCustodianOrganization,omitempty"`
}

type RepresentedCustodianOrganization struct {
	Id      Id      `xml:"id" json:"id,omitempty"`
	Name    Name    `xml:"name" json:"name,omitempty"`
	Telecom Telecom `xml:"telecom" json:"telecom,omitempty"`
	Address Address `xml:"addr" json:"address,omitempty"`
}

type DocumentationOf struct {
	TypeCode     string       `xml:"typeCode,attr" json:"typeCode,omitempty"`
	ServiceEvent ServiceEvent `xml:"serviceEvent" json:"serviceEvent,omitempty"`
}

type ServiceEvent struct {
	Code          Code      `xml:"code" json:"code,omitempty"`
	EffectiveTime Time      `xml:"effectiveTime" json:"effectiveTime,omitempty"`
	Performer     Performer `xml:"performer" json:"performer,omitempty"`
}

type Performer struct {
	TypeCode       string         `xml:"typeCode,attr" json:"typeCode,omitempty"`
	FunctionCode   Code           `xml:"functionCode" json:"functionCode,omitempty"`
	AssignedEntity AssignedEntity `xml:"assignedEntity" json:"assignedEntity,omitempty"`
}

type AssignedEntity struct {
	Id             Id             `xml:"id" json:"id,omitempty"`
	AssignedPerson AssignedPerson `xml:"assignedPerson" json:"assignedPerson,omitempty"`
}

type ComponentOf struct {
	EncompassingEncounter EncompassingEncounter `xml:"encompassingEncounter" json:"encompassingEncounter,omitempty"`
}

type EncompassingEncounter struct {
	Id               Id               `xml:"id" json:"id,omitempty"`
	Code             Code             `xml:"code" json:"code,omitempty"`
	EffectiveTime    Time             `xml:"effectiveTime" json:"effectiveTime,omitempty"`
	ResponsibleParty ResponsibleParty `xml:"responsibleParty" json:"responsibleParty,omitempty"`
}

type ResponsibleParty struct {
	AssignedEntity AssignedEntity `xml:"assignedEntity" json:"assignedEntity,omitempty"`
}

type Component struct {
	StructuredBody StructuredBody `xml:"structuredBody" json:"structuredBody,omitempty"`
	Section        Section        `xml:"section" json:"section,omitempty"`
}

type StructuredBody struct {
	Component []Component `xml:"component" json:"component,omitempty"`
}

type Section struct {
	TemplateId Id      `xml:"templateId" json:"templateId,omitempty"`
	Code       Code    `xml:"code" json:"code,omitempty"`
	Title      string  `xml:"title" json:"title,omitempty"`
	Text       Text    `xml:"text" json:"text,omitempty"`
	Entry      []Entry `xml:"entry" json:"entry,omitempty"`
}

type Text struct {
	Table Table `xml:"table" json:"table,omitempty"`
}

type Table struct {
	Border    int       `xml:"border,attr" json:"border,omitempty"`
	Width     string    `xml:"width,attr" json:"width,omitempty"`
	TableHead TableHead `xml:"thead" json:"thead,omitempty"`
	TableBody TableBody `xml:"tbody" json:"tbody,omitempty"`
}

type TableHead struct {
	TableRow TableRow `xml:"tr" json:"tr,omitempty"`
}

type TableBody struct {
	TableRow TableRow `xml:"tr" json:"tr,omitempty"`
}

type TableRow struct {
	TableHeader string    `xml:"th" json:"th,omitempty"`
	TableData   TableData `xml:"td" json:"td,omitempty"`
}

type TableData struct {
	Text string `xml:",chardata json:"text,omitempty"`
}

type Entry struct {
	TypeCode  string    `xml:"typeCode,attr" json:"typeCode,omitempty"`
	Act       Act       `xml:"act" json:"act,omitempty"`
	Encounter Encounter `xml:"encounter" json:"encounter,omitempty"`
}

type Act struct {
	ClassCode  string `xml:"classCode,attr" json:"classCode,omitempty"`
	MoodCode   string `xml:"moodCode,attr" json:"moodCode,omitempty"`
	TemplateId Id     `xml:"templateId" json:"templateId,omitempty"`
	Id         Id     `xml:"id" json:"id,omitempty"`
	Code       Code   `xml:"code" json:"code,omitempty"`
	StatusCode Code   `xml:"statusCode" json:"statusCode,omitempty"`
}

type Encounter struct {
}
