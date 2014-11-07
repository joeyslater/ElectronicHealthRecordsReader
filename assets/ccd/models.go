package ccd;

import (
  "encoding/xml"
)

func main (){
  xmlFile, err := os.Open("../../assets/output.xml")
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
	RealmCode Code `xml:"realmCode"`
	TypeId Id `xml:"typeId"`
	TemplateId []Id `xml:"templateId"`
	Id Id `xml:"id"`
	Code Code `xml:"code"`
	Title string `xml:"title"`
	EffectiveTime Time `xml:"effectiveTime"`
	ConfidentialityCode Code `xml:"confidentialityCode"`
	LanguageCode Code `xml:"languageCode"`
	RecordTarget RecordTarget `xml:"recordTarget"`
	Author Author `xml:"author"`
	Custodian Custodian `xml:"custodian"`
	DocumentationOf DocumentationOf `xml:"documentationOf"`
	ComponentOf ComponentOf `xml:"componentOf"`
	Component Component `xml:"component"`
}

type Id struct {
	Root string `xml:"root,attr"`
	Extension string `xml:"extension,attr"`
}

type Code struct {
	Code string `xml:"code,attr"`
	CodeSystem string `xml:"codeSystem,attr"`
	CodeSystemName string `xml:"codeSystemName,attr"`
	DisplayName string `xml:"displayName,attr"`
	CodeSystemVersion string `xml:"codeSystemVersion,attr"`
}

type Time struct {
	Value string `xml:"value,attr"`
}

type RecordTarget struct {
	PatientRole []PatientRole `xml:"patientRole"`
}

type PatientRole struct {
	Id Id `xml:"id"`
	Address Address `xml:"addr"`
	Telecom Telecom `xml:"telecom"`
	Patient Patient `xml:"patient"`
}

type Telecom struct {
	Value string `xml:"value,attr"`
	Use string  `xml:"use,attr"`
}

type Address struct {
	Use string  `xml:"use,attr"`
	StreetAddressLine string `xml:"streetAddressLine"`
	City string `xml:"city"`
	State string `xml:"state"`
	PostalCode string `xml:"postalCode"`
	Country string `xml:"country"`
}

type Patient struct {
	Name Name `xml:"name"`
	AdministrativeGenderCode Code `xml:"administrativeGenderCode"`
	BirthTime Time `xml:"birthTime"`
	RaceCode Code `xml:"raceCode"`
	EthnicGroupCode Code `xml:"ethnicGroupCode"`
}

type Name struct {
	Prefix string `xml:"prefix"`
	Given string `xml:"given"`
	Family string `xml:"family"`
	Suffix string `xml:"suffix"`
}

type Author struct {
	Time Time `xml:"time"`
	AssignedAuthor AssignedAuthor `xml:"assignedAuthor"`
}

type AssignedAuthor struct {
	Id Id `xml:"id"`
	Address Address `xml:"addr"`
	Telecom Telecom `xml:"telecom"`
	AssignedPerson AssignedPerson `xml:"assignedPerson"`
}

type AssignedPerson struct {
	Name Name `xml:"name"`
}

type Custodian struct {
	AssignedCustodian AssignedCustodian `xml:"assignedCustodian"`
}

type AssignedCustodian struct {
	RepresentedCustodianOrganization RepresentedCustodianOrganization `xml:"representedCustodianOrganization"`
}

type RepresentedCustodianOrganization struct {
	Id Id `xml:"id"`
	Name Name `xml:"name"`
	Telecom Telecom `xml:"telecom"`
	Address Address `xml:"address"`
}

type DocumentationOf struct {
	TypeCode string `xml:"typeCode,attr"`
	ServiceEvent ServiceEvent `xml:"serviceEvent"`
}

type ServiceEvent struct {
	Code Code `xml:"code"`
	EffectiveTime Time `xml:"effectiveTime"`
	Performer Performer `xml:"performer"`
}

type Performer struct {
	TypeCode string `xml:"typeCode,attr"`
	FunctionCode Code `xml:"functionCode"`
	AssignedEntity AssignedEntity `xml:"assignedEntity"`
}

type AssignedEntity struct {
	Id Id `xml:"id"`
	Code Code `xml:"code"`
	Address Address `xml:"addr"`
	Telecom Telecom `xml:"telecom"`
	AssignedPerson AssignedPerson `xml:"assignedPerson"`
}

type ComponentOf struct {
	EncompassingEncounter EncompassingEncounter `xml:"encompassingEncounter"`
}

type EncompassingEncounter struct {
	Id Id `xml:"id"`
	Code Code `xml:"code"`
	EffectiveTime Time `xml:"effectiveTime"`
	ResponsibleParty ResponsibleParty `xml:"responsibleParty"`
}

type ResponsibleParty struct {
	AssignedEntity AssignedEntity `xml:"assignedEntity"`
}

type Component struct {
	StructuredBody StructuredBody `xml:"structuredBody"`
	Section Section `xml:"section"`
}

type StructuredBody struct {
	Component []Component `xml:"component"`
}

type Section struct {
	TemplateId Id `xml:"templateId"`
	Code Code `xml:"code"`
	Title string `xml:"title"`
	Text Text 	`xml:"text"`
	Entry []Entry `xml:"Entry"`
}

type Text struct {
	Table Table `xml:"table"`
}

type Table struct {
	Border int `xml:"border,attr"`
	Width string `xml:"width,attr"`
	TableHead TableHead `xml:"thead"`
	TableBody TableBody `xml:"tbody"`
}

type TableHead struct {
	TableRow TableRow `xml:"tr"`
}

type TableBody struct {
	TableRow TableRow `xml:"tr"`
}

type TableRow struct {
	TableHeader string `xml:"th"`
	TableData TableData `xml:"td"`
}

type TableData struct {
	
}
type Entry struct {

}
type PatientRole {

}