import axios from 'axios';
import { API_URL, API_KEY, } from '../../config'
import { getToken } from '../../components/auth/auth'

const axiosInstance = axios.create({
    headers:  {
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'api_key': API_KEY,
    }
});

const axiosCall = async (url, {query, ...requestOptions}) => {
   const response = await axiosInstance({
        method: requestOptions.method, 
        url: encodeQueryParams(`${API_URL}${url}`, query),
        data: requestOptions.body 
    })
    return response
}

const encodeQueryParams = (url, query) => {
    url = new URL(url);
    // ToDo: Have to agree how to encode null
    if (query) {
        Object.entries(query).forEach(([k, v]) => url.searchParams.append(k, v));
    }
    return url;
}

export const unAuthAxiosCall = async (url, requestOptions) => {
    const response = await axiosCall(url, requestOptions);
    
        //const result = await handleAPIResponse(response);
        return response  
}

export const authAxiosCall = async (url, requestOptions) =>  {
    const response = await axiosCall(
        url,
        {
            ...requestOptions,
            headers: {
                ...requestOptions.headers,
                Authorization: getToken(),
            },
        },
    );
    return response  
}