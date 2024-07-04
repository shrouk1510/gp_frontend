import React, { createContext, useContext, useEffect, useState, useReducer, useCallback } from 'react';
import api_root from '../axios';
// import { getAllCookies } from '../helpers/cookies';
// import { backendAPI } from '../axios';
import Cookies from 'js-cookie';
export const AuthContext = createContext();


const SESSION_KEY = 'AR'

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
            role: undefined
        }
    );

    const [isloading, setIsLoading] = useState(true)
    const [ispotentiallogin, setIspotentiallogin] = useState(false)
    // const [userCookies, setUserCookies] = useState({})



    const loginUser = async (username, password) => {

        try {
            const response = await api_root.api.post(`/user/signin?username=${username}&password=${password}`);
            console.log('User data submitted:', response.data);
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
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
            console.log('User data submitted:', response.data);
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            setIspotentiallogin(true)
            setIsLoading(true)
            // setUserCookies(() => getAllCookies())

        } catch (error) {
            console.error('There was an error in login!', error);
            throw error
        }
    }

    const updateState = useCallback((action) => {
        dispatch(action);
    }, []);


    const updateUser = (name, value) => {
        dispatch({ activeUser: { ...state.activeUser, [name]: value } });
    };

    const createUserData = async (userData) => {
        try {
            const response = await api_root.api.post('/user/signup/account', userData);
            console.log('User data submitted:', response.data);
            alert(response.data)
        } catch (error) {
            console.error('There was an error!', error);
            throw error.response?.data
        }
    };

    const getActiveUserData = async () => {

        // const urlParams = new URLSearchParams(userCookies);
        // const keyValueString = urlParams.toString();
        try {
            const response = await api_root.api.get('/user/profile');
            //console.log('User data submitted:', response.data);
            const data = await response.json()
            dispatch("SET_USER", { payload: { ...data, ...data.details }, role: "USER" })



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
            const data = await response.json()
            dispatch("SET_USER", { payload: { ...data }, role: "ADMIN" })

        } catch (error) {
            console.error('There was an error!', error);
        }

    };


    const fetchData = async () => {
        const activeSession = Cookies.get(SESSION_KEY) || null
        try {

            if (activeSession) {
                await getActiveUserData()
                await getActiveAdminData()
            }

        } finally {
            setIsLoading(false)
            setIspotentiallogin(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [state, isloading, ispotentiallogin, Cookies])




    if (isloading || ispotentiallogin) {
        return (
            <div>
                loading
            </div>
        )
    }

    return (

        <AuthContext.Provider value={{ ...state, updateState, updateUser, createUserData, loginUser, loginAdmin }}>
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