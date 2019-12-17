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
