const AccountManagerService = require('../Business/Login/AccountManager.service');
class LoginController {

    name = `Login Endpoint`;

    constructor(AccountManagerService){
        this.accountManagerService = AccountManagerService;
    }

    loginRestAdapter(app){

        app.post('/login',(req, res) => {
            
            this.accountManagerService.login(req.body).then(data => {
                if(!data){
                    res.send({error:`Invalid account or password`});
                }else{
                    res.send(data);
                }
                res.end();
            })
        });

        app.post('/signIn',(req, res) => {
        
            this.accountManagerService.signIn(req.body).then(data => {
                res.send(data);
                res.end();
            })
        });
    }
}

module.exports = new LoginController(AccountManagerService);