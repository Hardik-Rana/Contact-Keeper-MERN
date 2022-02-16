import React,{useState,useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';


const Email = () => {
  const alertContext=useContext(AlertContext);
  const authContext=useContext(AuthContext);
  const {setAlert}=alertContext;
  const {forgotpassword,error,otp_match,verified,clearErrors,mailsent,spin,UpdatePassword}=authContext;
  const [email,setEmail]=useState('');
  const [otp,setOtp]=useState('');
  
  

  const [newpin,setNewpin]=useState({
    password:'',
    password2:''
});
    
    const {password,password2}=newpin;

    const Changepin=e=> setNewpin({...newpin, [e.target.name]: e.target.value});  
    

  if(error ==='User not found on this email.')
  {
      setAlert(error,'danger',3000);
      clearErrors();

  }

  if(error === 'OTP does not match.'){

      setAlert(error,'danger',3000);
      clearErrors();
  }

  if(error === 'Please check your email.')
  {
      
     setAlert(error,'primary',10000);
    clearErrors();
  }

  if(error === 'Password updated successfully!')
  {
    setAlert(error,'primary',3000)
    clearErrors();
    setTimeout(()=>window.location.replace("/login"),500);
      
  }

    const onChange=e=> setEmail(e.target.value);
    const Copyotp=e=> setOtp(e.target.value);

    const onSubmit=e=>{
      e.preventDefault();
      
      if(email === ''){
          setAlert('Please enter email first! ','danger');
          
      }else{
                   
          forgotpassword(email);
      }
 
    
  }

  const submit= e=>{
    e.preventDefault();
    otp_match(otp);
  }

  const onUpdate=e=>{
    e.preventDefault();
    if(password === '' || password2 === ''){
      setAlert('Please enter all fields', 'danger');
    }else if(password !== password2){
        setAlert('Password do not match', 'danger');
    }
    else{

          UpdatePassword({password,email});
      }
  }

  if(spin){
    return (<Spinner/>)
  }
 
    if(verified)
    {
  
      return(<div className='form-container'>
         <h1>
        Change <span className='text-primary'>Password</span>
    </h1>

    <form onSubmit={onUpdate}>
            
            <div className="from-group">
                <label htmlFor="password">Enter New Password</label>
                <input type="password" name="password" value={password} onChange={Changepin} minLength="6" />
            </div>
            <div className="from-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2" value={password2} onChange={Changepin} minLength="6" />
            </div>
            <input type="submit" value="Update" className='btn btn-primary btn-block'/>
        </form>


      </div>);
    }

    else{
      return (<div className='form-container'>
      <h1>
        Forgot <span className='text-primary'>Password</span>
    </h1>

    <form onSubmit={onSubmit}>
    <div className="from-group">
            <label htmlFor="email">Email Address</label>
            <input autoComplete='off' type="email" name="email" value={email} onChange={onChange} />
            <input type="submit" value="Send OTP" className='btn btn-primary btn-block'/>
            </div>
    </form>

      { mailsent &&

        <form onSubmit={submit} >  
      <div className='from-group'>
      <label htmlFor="otp">Enter OTP</label>
    <input autoComplete='off' type="text" name="otp" value={otp} onChange={Copyotp} />
    <input type="submit" value="Submit" className='btn btn-primary btn-block'/> 
      </div>
    </form>
    }
    

    
   </div>
) } 
}

export default Email;