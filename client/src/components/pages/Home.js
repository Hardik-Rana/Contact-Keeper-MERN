import React,{useEffect,useContext} from 'react';
import Contact from '../contacts/Contact';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import AuthContext from '../../context/auth/authContext';


const Home = () => {
  
  const authContext=useContext(AuthContext);
  useEffect(()=>{
    authContext.loadUser();
    // eslint-disable-next-line
  },[]);
  return <div className='grid-2'>
      <div>
        <ContactForm/>
      </div>

      <div>
        <ContactFilter/>
        <Contact/>
      </div>
  </div>;
};

export default Home;
