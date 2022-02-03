import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Navbar = ({title,icon}) => {
  return <div className='navbar bg-primary'>
      <h1>
          <i className={icon}/> {title}
      </h1>

        <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
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
