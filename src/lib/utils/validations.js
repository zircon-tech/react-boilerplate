export function validateFieldPassword(password) {
  if (password) {
    const passwordValid = password.match(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!?@#$%^&*_0-9]).*$/);
    return passwordValid;
  } 
  return null;
}

export function contain1UpperCase(password) {
  if (password) {
    const passwordValid = password.match(/^.*(?=.*[A-Z]).*$/);
    return passwordValid;
  }
  return null;
}

export function contain1LowerCase(password) {
  if (password) {
    const passwordValid = password.match(/^.*(?=.*[a-z]).*$/);
    return passwordValid;
  }
  return null;
}

export function contain8Character(password) {
  if (password) {
    const passwordValid = password.match(/^.*(?=.{8,}).*$/);
    return passwordValid;
  } 
  return null;
}

export function contain1NumberOrSpecialChar(password) {
  if (password) {
    const passwordValid = password.match(/^.*(?=.*[!?@#$%^&*_0-9]).*$/);
    return passwordValid;
  }
  return null;
}
