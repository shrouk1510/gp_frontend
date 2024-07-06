import axios from "axios";
import { getAllCookies } from "./lib/helpers/get-all-cookies";




export const backendBaseURL = "https://glucoguide.azurewebsites.net";
// export const backendBaseURL = "http://127.0.0.1:8000";
export const backendAPI = backendBaseURL;


// export const authTokens = JSON.parse(localStorage.getItem('authTokens'))
// export const token = authTokens ? authTokens['access'] : null;
// // alert(token)


const apiToken = axios.create({
    baseURL: backendAPI,
    // withCredentials: true
});

// apiToken.defaults.headers.post['Access-Control-Allow-Origin'] = "*"
// apiToken.defaults.headers.post['Access-Control-Allow-Credentials'] = "true"
// apiToken.defaults.headers.post['Access-Control-Allow-Headers'] = "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
// apiToken.defaults.headers.post['Access-Control-Allow-Methods'] = "GET,POST,PUT,DELETE,OPTIONS"
// apiToken.defaults.headers.post['Content-Type'] = 'multipart/form-data,application/json'
// if (token) {
//     apiToken.defaults.headers.post['Authorization'] = `Bearer ` + token;
//     apiToken.defaults.headers.get['Authorization'] = `Bearer ` + token;
//     apiToken.defaults.headers.put['Authorization'] = `Bearer ` + token;
//     apiToken.defaults.headers.patch['Authorization'] = `Bearer ` + token;
//     apiToken.defaults.headers.delete['Authorization'] = `Bearer` + token;
// }

const api = axios.create({
    withCredentials: true,
    baseURL: backendAPI,
});


api.defaults.headers.post['Access-Control-Allow-Origin'] = `*`
api.defaults.headers.post['Access-Control-Allow-Credentials'] = "true"
api.defaults.headers.post['Access-Control-Allow-Headers'] = "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Cookie"
api.defaults.headers.post['Access-Control-Allow-Methods'] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
api.defaults.headers.post['Content-Type'] = 'application/json'
// api.headers

const keyValuePairs = Object.entries(getAllCookies()).map(
    ([key, value]) => `${key}=${value}`
);
const keyValueString = keyValuePairs.join(";");

api.defaults.headers.get['Cookie'] = keyValueString;

const baseURLApi = axios.create({
    baseURL: backendBaseURL,
});

const api_root = { api, apiToken, baseURLApi };
export default api_root

