package auth

import (
	"appengine"
)

type UserWithPassword struct {
	Id           int64             `datastore:"-"`
	Username     string            `json:"username,omitempty"`
	Password     []byte            `json:"password,omitempty"`
	EmailAddress string            `json:"emailAddress,omitempty"`
	FirstName    string            `json:"firstName,omitempty"`
	LastName     string            `json:"lastName,omitempty"`
	Role         string            `json:"role,omitempty"`
	ProfilePic   appengine.BlobKey `json:"-,omitempty"`
	Ccd          appengine.BlobKey `json:"-,omitempty"`
	Specialties  []string          `json:"specialties,omitempty"`
}

type User struct {
	Id           int64             `datastore:"-"`
	Username     string            `json:"username,omitempty"`
	Password     []byte            `json:"-"`
	EmailAddress string            `json:"emailAddress,omitempty"`
	FirstName    string            `json:"firstName,omitempty"`
	LastName     string            `json:"lastName,omitempty"`
	Role         string            `json:"role,omitempty"`
	ProfilePic   appengine.BlobKey `json:"-,omitempty"`
	Ccd          appengine.BlobKey `json:"-,omitempty"`
	Specialties  []string          `json:"specialties,omitempty"`
}

const RoleAdmin string = "admin"
const RolePatient string = "patient"
const RoleDoctor string = "doctor"
const RoleNurse string = "nurse"
