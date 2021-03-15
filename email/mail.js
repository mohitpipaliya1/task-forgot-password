const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxee1bf98f3ff14e39a534cc06fb06c78a.mailgun.org';
const api_key = '0b3aeb8eab39a3103fd9796bb5e269c0-e49cc42c-3b58a8c3'
const mg = mailgun({apiKey: api_key, domain: DOMAIN});


const mail = (email,token)=>{
    
    const data = {
        from: 'Excited User <mohitpipaliya482@gmail.com>',
        to: email,
        subject: 'Hello hiii',
        
        text:`http://localhost:3000/resetpassword/${token}`
        
    };
    
    mg.messages().send(data, function (error, body) {
        return body;
    });
    }



    module.exports= mail;