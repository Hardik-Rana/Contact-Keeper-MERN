import React,{useReducer} from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    CLEAR_FILTER,
    CHANGE_LINK,
    SET_LINK

} from '../types';


const ContactState=(props)=>{

    const initialState={
        contacts:null,
        current: null,
        filtered: null,
        error: null,
        change:{
            link:'/about',
            tag:'About'
        }
    };

        const [state,dispatch]=useReducer(contactReducer,initialState);

        // Get Contacts
        const getContact= async ()=>{

            try {
                const res = await axios.get('/api/contacts'); 
                dispatch({type:GET_CONTACTS,payload:res.data.contacts});
            
            } catch (err) {
                dispatch({type:CONTACT_ERROR,payload: err.response.msg});
            }
        };

        // Add Contact
        const addContact= async contact=>{

            const config ={
                headers:{
                    'Content-Type' : 'application/json'
                }
            };
            
            try {
                const res = await axios.post('/api/contacts',contact,config); 
                dispatch({type:ADD_CONTACT,payload:res.data});
            
            } catch (err) {
                dispatch({type:CONTACT_ERROR,payload:err.response.msg});
            }
        };
        // Delete Contact
        const deleteContact= async id=>{

            try {
               await axios.delete(`/api/contacts/${id}`); 
                dispatch({type:DELETE_CONTACT,payload: id});
            } catch (err) {
                dispatch({type:CONTACT_ERROR,payload:err.response.msg});
            }

        };

        //  Update Contact
        const updateContact= async contact=>{

            const config ={
                headers:{
                    'Content-Type' : 'application/json'
                }
            };
            
            try {
                const res = await axios.put(`/api/contacts/${contact._id}`,contact,config); 
                dispatch({type:UPDATE_CONTACT,payload:res.data});
            
            } catch (err) {
                dispatch({type:CONTACT_ERROR,payload:err.response.msg});
            }

           
        };


        // Set Current Contact
        const setCurrent=(contact)=>{

            dispatch({type:SET_CURRENT,payload:contact});
        };
        
        //  Clear Current Contact
        const clearCurrent=()=>{

            dispatch({type:CLEAR_CURRENT});
        };

        // Clear Contacts 

        const clearContacts=()=>{

            dispatch({type:CLEAR_CONTACTS});
        };
        
        
        //  Filter Contacts
        const filterContacts=text=>{

            dispatch({type:FILTER_CONTACTS,payload:text});
        };

        // Clear Filter
        const clearFilter=()=>{

            dispatch({type:CLEAR_FILTER});
        };
        
        //  Change link
        const changelink=()=>{
          
            dispatch({type:CHANGE_LINK}); 
          
            if(state.change.link==='/')
            {
                dispatch({type:SET_LINK});
            }
            
         
         };

       
        return (

            <contactContext.Provider
               value={
                   {
                       contacts:state.contacts,
                       current:state.current,
                       error:state.error,
                       filtered:state.filtered,change:state.change,
                       changelink,
                       addContact,deleteContact,setCurrent,clearCurrent,updateContact,
                       filterContacts,clearFilter,getContact,clearContacts
                   }
               }
            >
                { props.children }
            </contactContext.Provider>
        )

};

export default ContactState;