import React,{useReducer} from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    EMAIL_SUCCESS,
    EMAIL_NOT_FOUND,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    OTP_MATCH,
    OTP_FAIL,SPIN,UPDATE_PASSWORD
} from '../types';
import setAuthToken from '../../utils/setAuthToken';


const AuthState=(props)=>{


    const initialState={
        token: localStorage.getItem('token'),
        isAuthenticated :null,
        loading: true,
        user:null,
        error:null,
        verified:null,
        mailsent:null,
        spin:false
    };

    const [state,dispatch]=useReducer(authReducer,initialState);



       // Load User
       const loadUser= async ()=>{
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res =await axios.get('/api/auth');
            dispatch({type:USER_LOADED,payload:res.data});
           

        } catch (err) {
            dispatch({type:AUTH_ERROR});
        }
        
       };

       // Register User

       const register = async formData=>{

        const config={
            headers: {
                'Content-Type':'application/json'
            }
        }
            try {
                const res= await axios.post('/api/users',formData,config);
                dispatch({
                    type:REGISTER_SUCCESS,
                    payload:res.data
                });
                loadUser();

            } catch (err) {
                dispatch({
                    type:REGISTER_FAIL,
                    payload:err.response.data.msg 
                });
            }
       }

       // Login User
       const login = async formData=>{

        const config={
            headers: {
                'Content-Type':'application/json'
            }
        }
            try {
                const res= await axios.post('/api/auth',formData,config);
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                });
                loadUser();

            } catch (err) {
                dispatch({
                    type:LOGIN_FAIL,
                    payload:err.response.data.msg 
                });
            }
       }


       // Logout
       const logout=()=>dispatch({type:LOGOUT});

       //Clear Errors
       const clearErrors=()=>dispatch({type:CLEAR_ERRORS});

     
      // Forgot Password

       const forgotpassword= async (email)=>{

        dispatch({type:SPIN});

        const config={
            headers: {
                'Content-Type':'application/json'
            }
        }

        try {
           
          const res = await axios.post('/api/email',{email},config);
          
            dispatch({
                type:EMAIL_SUCCESS,
                payload:res.data.msg
            });
           

        } catch (err) {
           
            dispatch({
                type:EMAIL_NOT_FOUND,payload:err.response.data.msg 
            });
            
        }

       };

         //OTP Match
         const otp_match= async otp=>{
        
            const config={
                headers: {
                    'Content-Type':'application/json'
                }
            }
               
                    
                const res=await axios.post('/api/email/match',{otp},config);

                if(res.data.msg ==='OTP matched!')
                {
                    dispatch({type:OTP_MATCH});
                }
                else{

                    dispatch({type:OTP_FAIL,payload:res.data.msg});
                }
                       
        }
           

       // UpdatePassword

            const  UpdatePassword= async  formData=>{
                
                const config ={
                    headers:{
                        'Content-Type' : 'application/json'
                    }
                };

                try {
                    const res = await axios.put(`/api/email`, formData,config); 
                    dispatch({type:UPDATE_PASSWORD,payload:res.data.msg});
                
                
                } catch (err) {
                    console.error(err.message);
                }
            };

        return (

            <authContext.Provider
               value={
                   {
                      token:state.token,
                      isAuthenticated:state.isAuthenticated,
                      loading:state.loading,
                      user:state.user,
                      error:state.error,
                      verified:state.verified,
                      mailsent:state.mailsent,
                      spin:state.spin,
                      register,loadUser,login,logout,clearErrors,forgotpassword,otp_match,
                      UpdatePassword
                    }
            }
            >
                { props.children }
            </authContext.Provider>
        )

};

export default AuthState;