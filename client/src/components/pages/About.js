import React from 'react';

const About = () => {
  
  const url='http://hardikrana.ml/';
  return <div>
      <h1>About This App</h1>
      <p className='my-1'>
          This is a full stack React app for keeping contacts.
      </p>
  
        <p className='my-1'>Version: 1.0</p>
        <div className='text-center bg-light'>
          &copy; Hardik Rana 
         <p> <a style={{color:'black'}} href={url}>www.hardikrana.ml</a> </p>
        </div>
      
  </div>;
};

export default About;
