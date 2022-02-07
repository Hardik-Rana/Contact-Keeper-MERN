import React ,{Fragment,useContext}from 'react';
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem';

const Contact = () => {

    const contactContect=useContext(ContactContext);

    const {contacts,filtered}=contactContect;

    if(contacts.length===0)
    {
        return <h4 className='text-center text-primary'>Please add a contact</h4>
    }

    return(
        <Fragment>
        {filtered!==null? filtered.map(contact=>(<ContactItem key={contact.id} contact={contact}/>)):contacts.map(contact=>(
           <ContactItem key={contact.id} contact={contact}/>
        ))}
        
        </Fragment>
    );
   

};

export default Contact;
