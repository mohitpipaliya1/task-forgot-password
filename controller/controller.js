
const {userModel} = require('../model/userModel')

const mail = require('../email/mail')

const Cryptr = require('cryptr')

const cryptr = new Cryptr(process.env.SECRET_KEY);
const jwt  = require('jsonwebtoken');

const signupuser = async(req,res)=>{
       
    try{  
        const data=new userModel(req.body)
        const token = await data.generateAuthToken()
        const user = await data.save()
        res.status(201).send({user,token})
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}


const signinuser = async (req, res) => {
    try {
       
        const user = await userModel.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

const forgotpasslink = async(req,res)=>{
    try{
            const user =  await userModel.findOne({email:req.body.email})
            console.log(user);

        if(!user)
        {
            return res.status(500).json({msg:"no user found"});
        }
        const token = await user.generateAuthToken();
        
        const encrypt=await cryptr.encrypt(token);
        console.log(encrypt);
        const maildata=mail(req.body.email,encrypt)

        res.send(maildata)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}



const logout= async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

const forgotpassword = async (req,res)=>{
        
        const decrypt = cryptr.decrypt(req.params.id)
       
        const decoded=jwt.verify(decrypt,process.env.JWT_SECRET)
    console.log(decoded._id);
       const user= await userModel.findById({_id:decoded._id});
       console.log(user);
        if(!user)
        {
            res.send("no user exist")
        }
      
        user.password= req.body.password
        await user.save()
       res.status(200).send(user)
}

const reset = async (req,res)=>{


            var user = await userModel.findByCredentials(req.body.email,req.body.password)
            console.log(user);
            if(req.body.newpassword===req.body.confirmpass)
            {
                user.password = req.body.newpassword
                await user.save();
                res.send(user)
            }
            else
            {
                res.send("user not exist")
            }
}

    module.exports = {signinuser,signupuser,forgotpasslink,logout,forgotpassword,reset}

    // const NodeRSA = require('node-rsa');

// const key = new NodeRSA({b: 512});

// var decryptdata =""

// var encrypted=async (token)=>{
//     try{
//         var encrytdata=await key.encrypt(token,'base64');
//         if(!encrytdata)
//         {
//             return console.error("error in encryption");
//         }
//         return encrytdata
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
// }

// var decrypted =async (dectoken)=>{
//    try{
//     var decryptdata =await key.decrypt(dectoken,'base64','utf8')
//    if(!decryptdata)
//    {
//        return console.error("error in decryption");
//    }
//    return decryptdata
//     }
//     catch(e){
//         console.log(e);
//     }
// }


