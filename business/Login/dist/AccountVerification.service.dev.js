"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vonage = require('@vonage/server-sdk');

var vonage = new Vonage({
  apiKey: "8b96af43",
  apiSecret: "Sr2mZsSPpXRCqoA1"
});

var nodemailer = require("nodemailer");

var EmailBodyBuilder = require('../Shared/EmailBodyBuilder');

var transporter = nodemailer.createTransport({
  host: "mail.pedeagora.pt",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: "no-reply@pedeagora.pt",
    // generated ethereal user
    pass: "boJzmo0nQM2J" // generated ethereal password

  }
});

var AccountVerification =
/*#__PURE__*/
function () {
  function AccountVerification(vonage) {
    _classCallCheck(this, AccountVerification);

    this.vonage = vonage;
  }

  _createClass(AccountVerification, [{
    key: "sendVerificationPhone",
    value: function sendVerificationPhone(phone) {
      return new Promise(function (res, rej) {
        vonage.verify.request({
          number: phone,
          brand: "Pede Agora"
        }, function (err, result) {
          if (err) {
            console.error(err);
            rej(err);
          } else {
            res(result);
          }
        });
      });
    }
  }, {
    key: "checkVerification",
    value: function checkVerification(verifyRequestId, input) {
      return new Promise(function (res, rej) {
        vonage.verify.check({
          request_id: verifyRequestId,
          code: input
        }, function (err, result) {
          if (err) {
            console.error(err);
            rej(error);
          } else {
            res(result);
          }
        });
      });
    }
  }, {
    key: "sendEmailVerification",
    value: function sendEmailVerification(email, nome, url) {
      var mailBody;
      return regeneratorRuntime.async(function sendEmailVerification$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mailBody = EmailBodyBuilder.getMailBody(nome, "http://localhost:3000/mailverify?token=".concat(url));
              _context.next = 3;
              return regeneratorRuntime.awrap(transporter.sendMail({
                from: 'no-reply@pedeagora.pt',
                to: email,
                subject: "Pede Agora - Verificação de Email",
                html: mailBody
              }).then(function (data) {})["catch"](function (e) {
                console.error("Erro Mail: ", e);
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return AccountVerification;
}();

module.exports = new AccountVerification(vonage);