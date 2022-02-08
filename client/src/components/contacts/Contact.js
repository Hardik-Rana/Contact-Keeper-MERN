import React ,{Fragment,useContext,useEffect}from 'react';
import ContactContext from '../../context/contact/contactContext'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contact = () => {

    const contactContect=useContext(ContactContext);

    const {contacts,getContact,loading,filtered}=contactContect;

    useEffect(()=>{
        getContact();
        //eslint-disable-next-line
    },[]);

    if(contacts !== null && contacts.length === 0 && !loading)
    {
        return <h4 className='text-center text-primary'>Please add a contact</h4>
    }

    return (
        <Fragment>
          {contacts !== null && !loading ? (
            <TransitionGroup>
              {filtered !== null
                ? filtered.map((contact) => (
                    <CSSTransition
                      key={contact._id}
                      timeout={500}
                      classNames="item"
                    >
                      <ContactItem contact={contact} /> 
                    </CSSTransition>
                  ))
                : contacts.map((contact) => (
                    <CSSTransition
                      key={contact._id}
                      timeout={500}
                      classNames="item"
                    >
                      <ContactItem contact={contact} />
                    </CSSTransition>
                  ))}
            </TransitionGroup>
          ) : (
            <Spinner />
          )}
        </Fragment>
      );
    };
    
    export default Contact;