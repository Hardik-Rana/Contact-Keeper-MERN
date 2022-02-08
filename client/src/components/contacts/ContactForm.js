import React,{useState,useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContect=useContext(ContactContext);

    const {addContact,current,updateContact,clearCurrent}=contactContect;

    useEffect(()=>{
        if(current!==null){
            setContact(current);

        }
        else{
            setContact({
                name: '',
                email: '',
                phone:'',
                type:'personal'
            });
        }
    },[contactContect,current]); 

    const [contact, setContact] =useState({
      name: '',
      email: '',
      phone:'',
      type:'personal'
  });

    const {name,email,phone,type}=contact;

    const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e =>{        
        e.preventDefault();
        if(current===null)
        {

            addContact(contact);
        }
        else{
            updateContact(contact);
        }

        setContact({
            name: '',
            email: '',
            phone:'',
            type:'personal'
        });
    };

    const clearAll=()=>{
        clearCurrent();
    }

    return <form onSubmit={onSubmit}>
         <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
         <input type="text" name='name' autoComplete='off' placeholder='Name' value={name} onChange={onChange} />
         <input type="text" name='email' autoComplete='off' placeholder='Email' value={email} onChange={onChange} />
         <input type="text" name='phone' autoComplete='off' placeholder='Phone' value={phone} onChange={onChange} /> 
         <h5>Contact Type</h5>
         <input type="radio" name='type' value='personal'  checked={type === 'personal'} onChange={onChange}/> Personal {' '}
         <input type="radio" name='type' value='professional'  checked={type === 'professional'} onChange={onChange}/> Professional

         <div>
             <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
         </div>
         {current && <div> <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}

    </form>;
};

export default ContactForm;
