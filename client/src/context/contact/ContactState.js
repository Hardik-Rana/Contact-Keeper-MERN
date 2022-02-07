import React,{useReducer} from 'react';
import {v4} from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';


const ContactState=(props)=>{

    const initialState={
        contacts:[
            {   
                id:1,
                name:'hardik',
                email:'hardik@gmail.com',
                phone:'1234567890',
                type:'personal'
            },
            {   
                id:2,
                name:'rana',
                email:'rana@gmail.com',
                phone:'987654321',
                type:'personal'
            },
            {
                id:3,
                name:'admin',
                email:'admin@gmail.com',
                phone:'5555555555',
                type:'professional'
            }
        ],
        current: null,
        filtered: null
    };

        const [state,dispatch]=useReducer(contactReducer,initialState);

        // Add Contact
        const addContact=contact=>{

            contact.id=v4();
            dispatch({type:ADD_CONTACT,payload:contact});
        };
        // Delete Contact
        const deleteContact=id=>{

            dispatch({type:DELETE_CONTACT,payload:id});
        };

        // Set Current Contact
        const setCurrent=(contact)=>{

            dispatch({type:SET_CURRENT,payload:contact});
        };
        
        //  Clear Current Contact
        const clearCurrent=()=>{

            dispatch({type:CLEAR_CURRENT});
        };
        
        //  Update Contact
        const updateContact=contact=>{

            dispatch({type:UPDATE_CONTACT,payload:contact});
        };

        //  Filter Contacts
        const filterContacts=text=>{

            dispatch({type:FILTER_CONTACTS,payload:text});
        };

        // Clear Filter
        const clearFilter=()=>{

            dispatch({type:CLEAR_FILTER});
        };

        return (

            <contactContext.Provider
               value={
                   {
                       contacts:state.contacts,
                       current:state.current,
                       filtered:state.filtered,
                       addContact,deleteContact,setCurrent,clearCurrent,updateContact,
                       filterContacts,clearFilter
                   }
               }
            >
                { props.children }
            </contactContext.Provider>
        )

};

export default ContactState;