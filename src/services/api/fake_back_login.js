export function callBackLogin(email, password) { 
    return new Promise(resolve => {
        setTimeout(() => {
          if (password === 'Celeste') {
                resolve(true);
                return 'true'
          } 
          resolve(false);
        }, 1000);
      });
}