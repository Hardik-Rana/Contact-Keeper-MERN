const express = require('express');
const path =require('path');
const router= express.Router(); 
const User=require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const config = require('config');
const usermail = config.get('user');
const passmail = config.get('pass');




// @route    POST api/email
// @desc     For Forgot-Password 
// @access   Public
let code;
let MATCH=false;

router.post('/', async (req,res)=>{

     const{email}=req.body;

    code=Math.floor((Math.random()*1000000)+1).toString();
   

    try {

         let user = await User.findOne({email});

         if(!user){
          return res.status(400).json({msg:"User not found on this email."});
         }
       
         if(user){
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: usermail,
                  pass: passmail
                }
              });

              const handlebarOptions = {
                viewEngine: {
                  extName: ".handlebars",
                  partialsDir: path.resolve(__dirname, './views'),
                  defaultLayout: false,
                },
                viewPath: path.resolve(__dirname, './views'),
                extName: ".handlebars",
              }
              
              transporter.use('compile', hbs(handlebarOptions));
              
              
              var mailOptions = {
                from: 'team.contactkeeper@gmail.com',
                to: email,
                subject: 'email from Team ContactKeeper',
                template:'email',
                context: {
                  title: 'Team ContactKeeper',
                  text: `Use the following OTP to complete your verification procedures. Please do not share your OTP for security reasons.`,
                  code:code
                }
              };

             
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  
                  res.json({msg: "Please check your email."});

                 
                }
              });  
            
        
            }
         } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
 
    
  });


  
// @route    PUT api/email
// @desc     Update Password
// @access   Private


router.put('/',async(req,res)=>{
    
  if(MATCH)
  {
    const {password,email}=req.body;

   //Build Password Object
   const passwordFields={};

   if(password) passwordFields.password= password;
  
  try {

  
      let user = await User.findOne({email});

      const salt = await bcrypt.genSalt(10);
      passwordFields.password = await bcrypt.hash(password,salt);
 
      await User.findByIdAndUpdate(user._id,{$set: passwordFields},{new: true});
      res.json({msg:"Password updated successfully!"});
  } catch (err) {
      
      console.error(err.message);
      res.status(500).send("Update Error");
  }

  }

  else{

    res.status(500).send("Auth Error");

  }
  
  
});


// @route    POST api/email/match
// @desc     OTP Match
// @access   Private

router.post('/match',(req,res)=>{
      
  const {otp}=req.body;

  if(code === otp)
  {
    MATCH=true;
    res.json({msg:"OTP matched!"});
    
  }
  else{
    res.json({msg:"OTP does not match."});

  }

});




module.exports = router;    