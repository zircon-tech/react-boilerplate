import FormValidator from "./FormValidator";

const passwordMatch = (confirmation, state) => state.password === confirmation;

export function contain1UpperCase() {
  return [/^.*(?=.*[A-Z]).*$/];
}

export function contain1LowerCase() {
  return [/^.*(?=.*[a-z]).*$/];
}

export function contain8Character() {
  return [/^.*(?=.{8,}).*$/];
}

export function contain1NumberOrSpecialChar() {
  return [/^.*(?=.*[!?@#$%^&*_0-9]).*$/];
}

export const form_rules = new FormValidator([
  {
    field: "first_name",
    method: "isEmpty",
    validWhen: false,
    message: "First Name is required."
  },
  {
    field: "last_name",
    method: "isEmpty",
    validWhen: false,
    message: "Last Name is required."
  },
  {
    field: "email",
    method: "isEmpty",
    validWhen: false,
    message: "Email is required."
  },
  {
    field: "email",
    method: "isEmail",
    validWhen: true,
    message: "That is not a valid email."
  },
  {
    field: "phone_number",
    method: "isEmpty",
    validWhen: false,
    message: "Please provide a phone number."
  },
  {
    field: "phone_number",
    method: "matches",
    args: [/^\(?\d\d\d\)? ?\d\d\d\d\d\d$/],
    validWhen: true,
    message: "That is not a valid phone number."
  },
  {
    field: "password",
    method: "isEmpty",
    validWhen: false,
    message: "Password is required."
  },
  {
    field: "password",
    method: "matches",
    args: contain8Character(),
    validWhen: true,
    message: "Password must have at least 8 characters."
  },
  {
    field: "password",
    method: "matches",
    args: contain1UpperCase(),
    validWhen: true,
    message: "Password must have at least one uppercase."
  },
  {
    field: "password",
    method: "matches",
    args: contain1LowerCase(),
    validWhen: true,
    message: "Password must have at least one lowercase."
  },
  {
    field: "password",
    method: "matches",
    args: contain1NumberOrSpecialChar(),
    validWhen: true,
    message: "Password must have at least one number or special char."
  },
  {
    field: "password_confirmation",
    method: "isEmpty",
    validWhen: false,
    message: "Password confirmation is required."
  },
  {
    field: "password_confirmation",
    method: passwordMatch,
    validWhen: true,
    message: "Password and password confirmation do not match."
  }
]);
