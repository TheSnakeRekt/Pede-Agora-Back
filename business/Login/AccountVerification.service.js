const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "8b96af43",
  apiSecret: "Sr2mZsSPpXRCqoA1"
});
const nodemailer = require("nodemailer");
const EmailBodyBuilder = require('../Shared/EmailBodyBuilder');

const transporter = nodemailer.createTransport({
    host: "mail.pedeagora.pt",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: `no-reply@pedeagora.pt`, // generated ethereal user
        pass: `boJzmo0nQM2J`, // generated ethereal password
    },
});

class AccountVerification {
    constructor(vonage){
        this.vonage = vonage;
    }

    sendVerificationPhone(phone) {
      return new Promise((res,rej)=>{
        vonage.verify.request({
          number: phone,
          brand: "Pede Agora"
        }, (err, result) => {
          if (err) {
            console.error(err);
            rej(err)
          } else {
            res(result)
          }
        });
      });
    }

    checkVerification(verifyRequestId, input) {
      
       return new Promise((res,rej)=>{


        vonage.verify.check({
          request_id: verifyRequestId,
          code: input
        }, (err, result) => {
          if (err) {
            console.error(err);
            rej(error)
          } else {
            res(result);
          }
        });
       })
    }

    async sendEmailVerification(email, nome, url) {

        let mailBody = EmailBodyBuilder.getMailBody(nome,`http://localhost:3000/mailverify?token=${url}`);

        await transporter.sendMail({
            from: 'no-reply@pedeagora.pt',
            to: email, 
            subject: "Pede Agora - Verificação de Email", 
            html: mailBody,
        }).then(data=>{
        }).catch(e=>{
          console.error("Erro Mail: ",e);
        });
    }

    
}

module.exports = new AccountVerification(vonage);