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

        await transporter.sendMail({
            from: 'no-reply@pedeagora.pt', // sender address
            to: email, // list of receivers
            subject: "Pede Agora - Verificação de Conta", // Subject line
            html: mailBody, // html body
        }).then(data=>{
          console.log('Mail Enviado')
        }).catch(e=>{
          console.error("Erro Mail: ",e);
        });
    }

    
}

module.exports = new AccountVerification(vonage);