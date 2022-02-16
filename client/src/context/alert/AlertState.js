import React,{useReducer} from 'react';
import alertContext from './alertContext';
import {v4} from 'uuid';
import alertReducer from './alertReducer';
import {
    REMOVE_ALERT,
    SET_ALERT
} from '../types';


const AlertState=(props)=>{

    const initialState=[];

        const [state,dispatch]=useReducer(alertReducer,initialState);

       // Set Alert
       const setAlert =(msg,type,timeout=2000)=>{
        const id=v4();
        dispatch({
            type:SET_ALERT,
            payload:{msg,type,id}
        });

        setTimeout(()=>dispatch({type:REMOVE_ALERT,payload: id}),timeout);
       }
        return (

            <alertContext.Provider
               value={
                   {
                    alerts:state,
                    setAlert
                }
            }
            >
                { props.children }
            </alertContext.Provider>
        )

};

export default AlertState;