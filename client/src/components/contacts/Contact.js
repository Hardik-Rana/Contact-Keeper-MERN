import React ,{Fragment,useContext}from 'react';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem';

const Contact = () => {

    const contactContect=useContext(ContactContext);

    const {contacts}=contactContect;

    return(
        <Fragment>
        {contacts.map(contact=>(
           <ContactItem key={contact.id} contact={contact}/>
        ))}
        </Fragment>
    );
   

};

export default Contact;
