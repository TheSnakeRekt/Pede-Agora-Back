const AccountManagerService = require('../Business/Login/AccountManager.service');
const ControlerServer = require('./ControllerServer');

class LoginController  {

    constructor(AccountManagerService){
        this.accountManagerService = AccountManagerService;
    }

    loginRestAdapter(){
        ControlerServer.app().get('/login', async (req, res) => {
            this.accountManagerService.login(req.body.user).then(data => {
                res.send(data);
                res.end();
            })
        });

        ControlerServer.app().get('/signIn', async (req, res) => {
            this.accountManagerService.signIn(req.body.user).then(data => {
                res.send(data);
                res.end();
            })
        });
    }
}

module.exports = new LoginController(AccountManagerService);