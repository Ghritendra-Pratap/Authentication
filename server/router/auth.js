const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var User = require('../models/userSchema');
require('../db/conn');

router.get('/', (req , res) =>{
    console.log('hello');
    res.send('hello world! from auth');
    
})

router.post('/register', async (req , res) => {
 
    const {name , email, phone , password, cpassword} = req.body;
    
    if(!name  || !email || !phone  || !password || !cpassword ){
        return(res.status(422).json({error:'plz filled all the option'}));
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return(res.status(422).json({error:'email already exist'}));

        }else if (password != cpassword){
            res.status(422).json({error:"password not match"});
        }

        const user = new User({name , email, phone, password , cpassword});

        const userRegister = await user.save();
        if(userRegister){
            res.status(201).json({message: "user registersd successfully"});
        }
        else{
            res.status(500).json({error:"Failed to registered"});
        }
       

    }catch(err){
        console.log(err);

    }   
});

//login route

router.post('/signin' , async (req , res) =>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(300).json({error : "plz filled all column"});
        }


        const userLogin = await User.findOne({email:email});
        if(userLogin){
            const ismatch = await bcrypt.compare(password, userLogin.password);
            if(!ismatch){
            return res.status(400).json({error : "invalid credential"});
            }else{
            res.json({message: "user signin successfully"});
            }
        }else{
            return res.status(400).json({error : "invalid credential"});
        }
        
    }catch(err){
        console.log(err);
    }
})

module.exports = router;