const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=mongoose.model("User");
const sendemail=require("./email");
const reqAuth=require('../middlewares/reqAuth');
const router=express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post('/signup',async (req,res)=>{ // req:request res:response
	try{
		const otp=await sendemail(req.body.email);
		const user=new User({email:req.body.email,password:req.body.password,isEmailVerified:false,otp:otp});
		await user.save();
		const token=jwt.sign({userId:user._id},process.env.SALT); 
		/* this is how u create a javascript token which is a 
		   unique string use to valid a user with in an app or 
			a website 
			first argument is the data of which we want to create a jwt
			seciond argument is the secret key which is used to create a jwt
			and we can retrieve data from jwt using this string
		*/
		res.send({token});
	}catch(err)
	{
		return res.status(422).send(err.message); 
		/* res.status is status of http request 422 is a 
		technical term for error which mean the user has 
		send some invalid information
		err.message is a automatically generate message by mangodb
		*/
	}
});

router.post('/signin',async (req,res)=>{
	const {email,password}=req.body;	
	if (!email || !password)
	{
		return res.status(422).send({error: 'Must provide an email or password'});
	}
	const user=await User.findOne({email});
	if (!user)
	{
		return res.status(422).send({error:"Invalid email or password"});
	}
	try{
		await user.comparePassword(password);
		const token=jwt.sign({ userId:user._id},process.env.SALT);
		res.send({token,isEmailVerified:user.isEmailVerified});
	}catch(err)
	{
		return res.status(422).send({error:"Invalid email or password"});
	}
});
router.post('/otpverify',reqAuth,async (req,res)=>{
	const {otp}=req.body;
	const user=req.user;
	if(user.otp==otp){
		try{
			await User.findOneAndUpdate({email:user.email},{isEmailVerified:true});
			res.send({isEmailVerified:true});
		}catch(err){
			return res.status(422).send({error: 'Something went wrong'});
		}
	}else{
		return res.status(422).send({error:'Incorrect otp'});
	}
});

module.exports=router;