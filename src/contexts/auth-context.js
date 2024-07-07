import React, { createContext, useContext, useEffect, useState, useReducer, useCallback } from 'react';
import api_root from '../axios';
// import { getAllCookies } from '../helpers/cookies';
// import { backendAPI } from '../axios';
// import Cookies from 'js-cookie';
import { getAllCookies } from '../lib/helpers/get-all-cookies';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { getAllActiveSessionsRequest } from '../lib/api/user';

export const AuthContext = createContext();


const SESSION_KEY = 'JSESSIONID'

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "SET_USER":
                    return {
                        ...state,
                        activeUser: action.payload,
                        role: action.role
                    };

                case "LOGOUT_USER":
                    return {
                        ...state,
                        activeUser: null,
                        role: undefined
                    };
                // case "SET_CURRENT_LANGUAGE":
                //   const currentLanguage = state.languages?.find(
                //     (lang) => lang?.code === action.payload
                //   );
                //   cookies.set("i18next", action.payload);
                //   return {
                //     ...state,
                //     currentLanguage: currentLanguage,
                //     currentLanguageCode: action.payload,
                //   };
                default:
                    return {
                        ...state,
                        ...action,
                    };
            }
        },
        {
            activeUser: null,
            role: null
        }
    );

    const [isloading, setIsLoading] = useState(true)
    const [ispotentiallogin, setIspotentiallogin] = useState(false)
    // const [userCookies, setUserCookies] = useState({})



    const loginUser = async (username, password) => {

        // const keyValuePairs = Object.entries(getAllCookies()).filter(([_, value]) => value).map(
        //     ([key, value]) => `${key}=${value}`
        // );
        // const keyValueString = keyValuePairs.join(";");
        try {

            // const promise = await fetch(backendAPI.concat(`/user/signin?username=${username}&password=${password}`), {
            //     method: "POST",
            //     // headers: {
            //     //     "Cookie": keyValueString
            //     // }
            // });

            // console.log(promise)
            // if (!promise.ok) {
            //     throw Error(promise.statusText)
            // }
            const response = await api_root.api.post(`/user/signin`, { username, password });
            // console.log('User data submitted:', response.data);

            const data = await response.data

            // console.log(getAllCookies())

            // const activeSession = await getAllActiveSessionsRequest()
            // console.log(activeSession, Object.keys(activeSession))

            // if (response.status !== 200) {
            //     throw new Error(response.statusText)
            // }
            dispatch({ type: "SET_USER", payload: { ...data }, role: "USER" })
            setIspotentiallogin(true)
            setIsLoading(true)
            // setUserCookies(() => getAllCookies())

        } catch (error) {
            console.error('There was an error in login!', error);
            throw error
        }
    }

    const loginAdmin = async (username, password) => {

        try {
            const response = await api_root.api.post(`/admin/signin?username=${username}&password=${password}`);
            // console.log('User data submitted:', response.data);
            // if (response.status !== 200) {
            //     throw new Error(response.statusText)
            // }

            const data = await response.data

            // console.log(Cookies.get('JSESSIONID'))
            dispatch({ type: "SET_USER", payload: { ...data }, role: "ADMIN" })
            setIspotentiallogin(true)
            setIsLoading(true)
            // setUserCookies(() => getAllCookies())

        } catch (error) {
            console.error('There was an error in login!', error);
            throw error
        }
    }

    const logoutUser = async () => {
        try {
            const response = await api_root.api.post('/user/signout');
            console.log('User logout submitted:', response.data);
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            setIsLoading(true)
            dispatch({ type: "LOGOUT_USER" })
            // setUserCookies(() => getAllCookies())

        } catch (error) {
            console.error('There was an error in logout!', error);
            throw error
        }
    }

    const logoutAdmin = async () => {
        try {
            const response = await api_root.api.post('/admin/logout');
            console.log('Admin logout submitted:', response.data);
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            setIsLoading(true)
            dispatch({ type: "LOGOUT_USER" })
            // setUserCookies(() => getAllCookies())

        } catch (error) {
            console.error('There was an error in logout!', error);
            throw error
        }
    }



    const updateState = useCallback((action) => {
        dispatch(action);
    }, []);


    const updateUser = (name, value) => {
        dispatch({ activeUser: { ...state.activeUser, [name]: value } });
    };

    const createAdminData = async (userData) => {
        try {
            const response = await api_root.api.post('/admin/signup', userData);
            console.log('User data submitted:', response.data);
            if (![200, 201].includes(response.status)) {
                throw Error(response.statusText)
            }

            // alert(response.data)
            toast.success("Admin created successfully !")
        } catch (error) {
            // console.error('There was an error!', error);
            throw error.response?.data
        }
    };

    const createUserData = async (userData) => {
        try {
            console.log(userData)

            await api_root.api.post('/user/signup', userData);
            // console.log('User data submitted:', response.data);
            // if (![200, 201].includes(response.status)) {
            //     throw Error(response.statusText)
            // }

            toast.success("User created successfully !")
        } catch (error) {
            console.error('There was an error!', error);
            throw typeof error.response?.data === "string" ? error.response?.data : error.response?.data["error"]
        }
    };

    const getActiveUserData = async () => {

        // const keyValuePairs = Object.entries(getAllCookies()).filter(([_, value]) => value).map(
        //     ([key, value]) => `${key}=${value}`
        // );
        // const keyValueString = keyValuePairs.join(";");
        // console.log(keyValueString)
        // console.log(backendAPI.concat('/user/profile'))
        try {
            // const response = await fetch(backendAPI.concat('/user/profile'), {
            //     mode: "no-cors",
            //     headers: {
            //         "Cookie": keyValueString
            //     }
            // });
            // const data = await response.json()

            // console.log(response)
            const response = await api_root.api.get('/user/profile');
            const data = await response.data
            //console.log('User data submitted:', response.data);
            // dispatch("SET_USER", { payload: { ...data, ...data.details }, role: "USER" })
            dispatch({ type: "SET_USER", payload: { ...data }, role: "USER" })

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const getActiveAdminData = async () => {
        // const urlParams = new URLSearchParams(userCookies);
        // const keyValueString = urlParams.toString();

        try {
            const response = await api_root.api.get('/admin/profile');
            // console.log('User data submitted:', response.data);
            const data = await response.data
            dispatch({ type: "SET_USER", payload: { ...data }, role: "ADMIN" })

        } catch (error) {
            console.error('There was an error!', error);
        }

    };





    useEffect(() => {
        const fetchData = async () => {
            const activeSession = Cookies.get(SESSION_KEY) || {}
            // const activeSession = getAllCookies()
            // const activeSession = await getAllActiveSessionsRequest()
            console.log(activeSession, Object.keys(activeSession)?.length)
            // console.log(Cookies.get('JSESSIONID'))
            try {

                if (Object.keys(activeSession).length > 0) {
                    await getActiveUserData()
                    await getActiveAdminData()
                }

            } finally {
                setIsLoading(false)
                setIspotentiallogin(false)
            }
        }

        fetchData();
    }, [state, isloading, ispotentiallogin])




    if (isloading || ispotentiallogin) {
        return (
            <div>
                loading
            </div>
        )
    }

    return (

        <AuthContext.Provider value={{ ...state, updateState, updateUser, createUserData, createAdminData, loginUser, loginAdmin, logoutUser, logoutAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(
            "useAuthContext must be used within a AuthContextProvider"
        );
    }
    return context;
};