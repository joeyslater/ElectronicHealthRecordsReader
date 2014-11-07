package main;

import (
  "os"
  "fmt"
  "io/ioutil"
  "encoding/xml"
)

func main (){
  xmlFile, err := os.Open("output.xml")
  if err != nil {
	  fmt.Println("Error opening file:", err)
		return
	}
	defer xmlFile.Close()

	b, _ := ioutil.ReadAll(xmlFile)

	var doc ClinicalDocument
	xml.Unmarshal(b, &doc)

	fmt.Println(doc.RealmCode);
}

type ClinicalDocument struct {
	RealmCode Code `xml:"realmCode" json:"realmCode"`
	TypeId Id `xml:"typeId" json:"typeId"`
	TemplateId []Id `xml:"templateId" json:"templateId"`
	Id Id `xml:"id" json:"id"`
	Code Code `xml:"code" json:"code"`
	Title string `xml:"title" json:"title"`
	EffectiveTime Time `xml:"effectiveTime" json:"effectiveTime"`
	ConfidentialityCode Code `xml:"confidentialityCode" json:"confidentialityCode"`
	LanguageCode Code `xml:"languageCode" json:"languageCode"`
	RecordTarget RecordTarget `xml:"recordTarget" json:"recordTarget"`
	Author Author `xml:"author" json:"author"`
	Custodian Custodian `xml:"custodian" json:"custodian"`
	DocumentationOf DocumentationOf `xml:"documentationOf" json:"documentationOf"`
	ComponentOf ComponentOf `xml:"componentOf" json:"componentOf"`
	Component Component `xml:"component" json:"component"`
}

type Id struct {
	Root string `xml:"root,attr" json:"root"`
	Extension string `xml:"extension,attr" json:"extension"`
}

type Code struct {
	Code string `xml:"code,attr" json:"code"`
	CodeSystem string `xml:"codeSystem,attr" json:"codeSystem"`
	CodeSystemName string `xml:"codeSystemName,attr" json:"codeSystemName"`
	DisplayName string `xml:"displayName,attr" json:"displayName"`
	CodeSystemVersion string `xml:"codeSystemVersion,attr" json:"codeSystemVersion"`
}

type Time struct {
	Value string `xml:"value,attr" json:"value"`
}

type RecordTarget struct {
	PatientRole []PatientRole `xml:"patientRole" json:"patientRole"`
}

type PatientRole struct {
	Id Id `xml:"id" json:"id"`
	Address Address `xml:"addr" json:"addr"`
	Telecom Telecom `xml:"telecom" json:"telecom"`
	Patient Patient `xml:"patient" json:"patient"`
}

type Telecom struct {
	Value string `xml:"value,attr" json:"value"`
	Use string  `xml:"use,attr" json:"use"`
}

type Address struct {
	Use string  `xml:"use,attr" json:"use"`
	StreetAddressLine string `xml:"streetAddressLine" json:"streetAddressLine"`
	City string `xml:"city" json:"city"`
	State string `xml:"state" json:"state"`
	PostalCode string `xml:"postalCode" json:"postalCode"`
	Country string `xml:"country" json:""`
}

type Patient struct {
	Name Name `xml:"name" json:"name"`
	AdministrativeGenderCode Code `xml:"administrativeGenderCode" json:"administrativeGenderCode"`
	BirthTime Time `xml:"birthTime" json:"birthTime"`
	RaceCode Code `xml:"raceCode" json:"raceCode"`
	EthnicGroupCode Code `xml:"ethnicGroupCode" json:"ethnicGroupCode"`
}

type Name struct {
	Prefix string `xml:"prefix" json:"prefix"`
	Given string `xml:"given" json:"given"`
	Family string `xml:"family" json:"family"`
	Suffix string `xml:"suffix" json:"suffix"`
}

type Author struct {
	Time Time `xml:"time" json:"" json:"time"`
	AssignedAuthor AssignedAuthor `xml:"assignedAuthor" json:"assignedAuthor"`
}

type AssignedAuthor struct {
	Id Id `xml:"id" json:"id"`
	Address Address `xml:"addr" json:"addr"`
	Telecom Telecom `xml:"telecom" json:"telecom"`
	AssignedPerson AssignedPerson `xml:"assignedPerson" json:"assignedPerson"`
}

type AssignedPerson struct {
	Name Name `xml:"name" json:"name"`
}

type Custodian struct {
	AssignedCustodian AssignedCustodian `xml:"assignedCustodian" json:"assignedCustodian"`
}

type AssignedCustodian struct {
	RepresentedCustodianOrganization RepresentedCustodianOrganization `xml:"representedCustodianOrganization" json:"representedCustodianOrganization"`
}

type RepresentedCustodianOrganization struct {
	Id Id `xml:"id" json:"id"`
	Name Name `xml:"name" json:"name"`
	Telecom Telecom `xml:"telecom" json:"telecom"`
	Address Address `xml:"addr" json:"address"`
}

type DocumentationOf struct {
	TypeCode string `xml:"typeCode,attr" json:"typeCode"`
	ServiceEvent ServiceEvent `xml:"serviceEvent" json:"serviceEvent"`
}

type ServiceEvent struct {
	Code Code `xml:"code" json:"code"`
	EffectiveTime Time `xml:"effectiveTime" json:"effectiveTime"`
	Performer Performer `xml:"performer" json:"performer"`
}

type Performer struct {
	TypeCode string `xml:"typeCode,attr" json:"typeCode"`
	FunctionCode Code `xml:"functionCode" json:"functionCode"`
	AssignedEntity AssignedEntity `xml:"assignedEntity" json:"assignedEntity"`
}

type AssignedEntity struct {
	Id Id `xml:"id" json:"id"`
	Code Code `xml:"code" json:"code"`
	Address Address `xml:"addr" json:"addr"`
	Telecom Telecom `xml:"telecom" json:"telecom"`
	AssignedPerson AssignedPerson `xml:"assignedPerson" json:"assignedPerson"`
}

type ComponentOf struct {
	EncompassingEncounter EncompassingEncounter `xml:"encompassingEncounter" json:"encompassingEncounter"`
}

type EncompassingEncounter struct {
	Id Id `xml:"id" json:"id"`
	Code Code `xml:"code" json:"code"`
	EffectiveTime Time `xml:"effectiveTime" json:"effectiveTime"`
	ResponsibleParty ResponsibleParty `xml:"responsibleParty" json:"responsibleParty"`
}

type ResponsibleParty struct {
	AssignedEntity AssignedEntity `xml:"assignedEntity" json:"assignedEntity"`
}

type Component struct {
	StructuredBody StructuredBody `xml:"structuredBody" json:"structuredBody"`
	Section Section `xml:"section" json:"section"`
}

type StructuredBody struct {
	Component []Component `xml:"component" json:"component"`
}

type Section struct {
	TemplateId Id `xml:"templateId" json:"templateId"`
	Code Code `xml:"code" json:"code"`
	Title string `xml:"title" json:"title"`
	Text Text 	`xml:"text" json:"text"`
	Entry []Entry `xml:"entry" json:"entry"`
}

type Text struct {
	Table Table `xml:"table" json:"table"`
}

type Table struct {
	Border int `xml:"border,attr" json:"border"`
	Width string `xml:"width,attr" json:"width"`
	TableHead TableHead `xml:"thead" json:"thead"`
	TableBody TableBody `xml:"tbody" json:"tbody"`
}

type TableHead struct {
	TableRow TableRow `xml:"tr" json:"tr"`
}

type TableBody struct {
	TableRow TableRow `xml:"tr" json:"tr"`
}

type TableRow struct {
	TableHeader string `xml:"th" json:"th"`
	TableData TableData `xml:"td" json:"td"`
}

type TableData struct {
	Text string `xml:",chardata json:"text"`
}
type Entry struct {

}