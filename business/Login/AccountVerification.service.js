const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "8b96af43",
  apiSecret: "Sr2mZsSPpXRCqoA1"
});
const nodemailer = require("nodemailer");
const EmailBodyBuilder = require('../Shared/EmailBodyBuilder');

/*const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});*/

class AccountVerification {
    constructor(vonage){
        this.vonage = vonage;
    }

    sendVerificationPhone(phone) {
        vonage.verify.request({
            number: `351${phone}`,
            brand: "Pede Agora"
          }, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              const verifyRequestId = result.request_id;
              console.log('request_id', verifyRequestId);
              return verifyRequestId;
            }
          });
    }

    checkVerification(verifyRequestId, input) {
        vonage.verify.check({
            request_id: verifyRequestId,
            code: input
          }, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              return result;
            }
          });
    }

    async sendEmailVerification(email, nome, url) {
        console.log(`http://localhost:3000/mailverify?token=${url}`)
        let mailBody = EmailBodyBuilder.getMailBody(nome,`http://localhost:3000/mailverify?token=${url}`);

        /*let info = await transporter.sendMail({
            from: 'noreply@pede-agora.com', // sender address
            to: email, // list of receivers
            subject: "Pede Agora - Verificação de Conta", // Subject line
            html: mailBody, // html body
        });*/
    }

    
}

module.exports = new AccountVerification(vonage);