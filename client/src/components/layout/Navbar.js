import React, { Fragment ,useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({title,icon}) => {

    const contactContext=useContext(ContactContext);
    const authContext=useContext(AuthContext);


    const {isAuthenticated,logout,user}=authContext;
    const {clearContacts,changelink,change}=contactContext;

    const onLogout=()=>{
        logout();
        clearContacts();    

    }

    const onChange=()=>{

      changelink();
    
    }

    const authLinks=(
        <Fragment>
            <li>Hello {user && user.name} <i className="far fa-hand-spock"></i></li>
            <li>
                <a  onClick={onLogout} href="#!"> <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'> Logout</span></a>
            </li>
            <li>
                    <Link to={change.link} onClick={onChange}>{change.tag}</Link>
            
            </li>
            
        </Fragment>
    );
    
    const guestLinks=(
        <Fragment>
           <Link to='/register'><li>Register</li></Link>
            <Link to='/login'><li>Login</li></Link>
            <Link to='/about'><li>About</li></Link>
        </Fragment>
    );

  return <div className='navbar bg-primary'>
      <h1>
          <i className={icon}/> {title}
      </h1>

        <ul>
            {isAuthenticated ?authLinks : guestLinks }
            
        </ul>
  </div>;
};

Navbar.propTypes={
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps={
    title:"Contact Keeper",
    icon:"fas fa-id-card-alt"
}
export default Navbar;
