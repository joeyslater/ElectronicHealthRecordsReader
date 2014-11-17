package auth

type User struct {
	Username  string `json:"username,omitempty"`
	Password  []byte `json:"password,omitempty"`
	FirstName string `json:"firstName,omitempty"`
	LastName  string `json:"lastName,omitempty"`
	Role      string `json:"role,omitempty"`
}

const RoleAdmin string = "admin"
const RolePatient string = "patient"
const RoleDoctor string = "doctor"
const RoleNurse string = "nurse"
