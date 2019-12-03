export function callBackLogin({email, password}) { 
  
    if (password === "Celeste") {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}