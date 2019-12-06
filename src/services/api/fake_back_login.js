
export const callBackLogin =  (email, password) => {
    const response =  new Promise(resolve => {
        setTimeout(() => {
          if (password === 'Celeste') {
                resolve(true);
          } 
          resolve(false);
        }, 1000);
      });
      return response;
 }
