const storage  =  localStorage
const tokenKey = 'jwtToken';

export const setToken = (token) =>  {
    storage.setItem(
        tokenKey,
        JSON.stringify({
            value: token,
        })
    );
}

export const getToken = () =>  {
    const encodedStoredToken = storage.getItem(tokenKey);
    if (encodedStoredToken) {
        try {
            let storedToken = JSON.parse(encodedStoredToken);
            return storedToken.value;
        } catch (e) {
            return null;
        }
    }
    return null;
}