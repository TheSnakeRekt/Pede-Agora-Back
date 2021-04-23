const AccountManagerService = require('../Business/Login/AccountManager.service');

class LoginController {

    name = `Login Endpoint`;

    constructor(AccountManagerService){
        this.accountManagerService = AccountManagerService;
    }

    loginRestAdapter(app){

        app.post('/login',(req, res) => {
            if(this.accountManagerService.checkToken(req.headers['x-access-token'])){
                res.send(data);
                res.end();
            }

            this.accountManagerService.login(req.body).then(data => {
                if(!data){
                    res.send({error:`Invalid account or password`});
                }else{
                    res.send(data);
                }
                res.end();
            });
        });

        app.post('/signin',(req, res) => {
            this.accountManagerService.signIn(req.body).then(data => {
                res.send(data);
                res.end();
            });
        });

        app.get('/mailverify',(req, res) =>{
            this.accountManagerService.verifyAccount(req.query.token).then(data=>{
                console.log(data);
                res.send(data);
                res.end();
            });
        });

        app.get('/phoneverify',(req, res) =>{
            this.accountManagerService.verifyAccountPhone(req.body.codigo, req.body.telefone).then(data=>{
                console.log(data);
                res.send(data);
                res.end();
            });
        });
    }
}

module.exports = new LoginController(AccountManagerService);