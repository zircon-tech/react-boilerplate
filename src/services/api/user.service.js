import { unAuthAxiosCall } from './axiosCall';

export const login = async (email, password) => {
    return unAuthAxiosCall(
        '/login',
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    email,
                    password,
                }
            )
        }
    );
}

export const register = async (user) => {
    return unAuthAxiosCall(
        '/user',
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    cellphone: user.phone_number,
                    email: user.email,
                    password: user.password,
                }
            ),
        }
    );
}
   

