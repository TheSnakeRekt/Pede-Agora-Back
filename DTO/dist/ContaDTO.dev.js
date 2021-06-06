"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function ContaDTO() {
    _classCallCheck(this, ContaDTO);
  }

  _createClass(ContaDTO, null, [{
    key: "mapper",
    value: function mapper(conta, token) {
      return {
        password: conta.password,
        access: conta.access,
        verified: conta.verified,
        verifiedMail: conta.verifiedMail,
        verifyCode: token
      };
    }
  }]);

  return ContaDTO;
}();