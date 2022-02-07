import React,{useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

const ContactItem = ({contact}) => {

    const contactContect=useContext(ContactContext);

    const {deleteContact,setCurrent,clearCurrent}=contactContect;

    const {id,name,email,phone,type}=contact;

    const onDelete=()=>{
          deleteContact(id);  
          clearCurrent();
    };

  return <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{'  '} <span style={{float:'right'}} className={"badge "+ (type === "professional" ? "badge-success": "badge-primary")} > {type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      
      <ul className="List">
          {email && <li><i className='fas fa-envelope-open'></i> {email}</li>}
          {phone && <li><i className='fas fa-phone'></i> {phone}</li>}
      </ul>
      <p style={{marginTop:'7px'}}>
          <button className="btn btn-dark btn-sm" onClick={()=>setCurrent(contact)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>

  </div>;
};

ContactItem.protoType={
    contact:PropTypes.object.isRequired
}

export default ContactItem;




 