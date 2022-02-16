import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EMAIL_NOT_FOUND,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    EMAIL_SUCCESS,
    OTP_MATCH,
    OTP_FAIL,
    UPDATE_PASSWORD,SPIN
} from '../types'


export default (state, action)=>{

    switch(action.type)
    {   
        case USER_LOADED:
          
        return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user:action.payload
            
        };
 
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:    
        localStorage.setItem('token',action.payload.token); 
        return {
            ...state,
            ...action.payload,
            isAuthenticated :true,
            loading:false
        };

        case REGISTER_FAIL:
        case AUTH_ERROR:    
        case LOGIN_FAIL:
        case LOGOUT:  
        case EMAIL_NOT_FOUND:  
        
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated :false,
                loading:false,
                user:null,
                error:action.payload,
                spin:false

            }

        

        case CLEAR_ERRORS:
            return{
            ...state,
            error:null
            }           
            
        case SPIN:
            return{
                ...state,
                spin:true
            }


        case EMAIL_SUCCESS:
            return{
                ...state,
                error:action.payload,
                mailsent:true,
                spin:false
            }
        

        case OTP_MATCH:
            return{
                ...state,
                verified:true
            }
        

        case OTP_FAIL:
            return{
                ...state,
                error:action.payload
            }
        

        case UPDATE_PASSWORD:
            return{
                ...state,
                error:action.payload,
                varified:false
            }
        

        default:
            return state;
    }
}