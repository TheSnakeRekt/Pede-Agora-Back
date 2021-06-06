const AccountManagerService = require('../Business/Login/AccountManager.service');

class LoginController {

    name = `Login Endpoint`;

    constructor(AccountManagerService){
        this.accountManagerService = AccountManagerService;
    }

    loginRestAdapter(app){

        app.post('/login', (req, res) => {
            let data = this.accountManagerService.checkToken(req.headers['x-access-token']);
            Promise.resolve(data).then((solved)=>{
                if(solved.access){
                
                    res.send(solved);
                    res.end();
                }else{
                    this.accountManagerService.login(req.body).then(account => {
                        if(!account){
                            res.send({error:`Invalid account or password`});
                        }else{
                            res.send(account);
                        }
                        res.end();
                    });
                }

            })

        });

        app.post('/signin',(req, res) => {
            this.accountManagerService.signIn(req.body).then(data => {
                res.send(data);
                res.end();
            });
        });

        app.post('/address',async (req,res)=>{
            let data = await this.accountManagerService.checkToken(req.headers['x-access-token']);

            if(data){
                data = await this.accountManagerService.addAddress(data, req.body);
            }

            res.send(data);
            res.end();
            return; 
        });

        
        app.post('/psw',async (req,res)=>{
            let data = await this.accountManagerService.checkToken(req.headers['x-access-token']);

            if(data){
                data = await this.accountManagerService.changePassword(data, req.body.oldPassword, req.body.newPassword);
            }

            res.send(data);
            res.end();
            return; 
        });

        app.delete('/address',async (req,res)=>{
            let data = await this.accountManagerService.checkToken(req.headers['x-access-token']);
           
            if(data){
                data = await this.accountManagerService.removeAddress(data, req.query.address);
            }

            res.send(data);
            res.end();
            return; 
        });

        app.get('/mailverify',(req, res) =>{
            this.accountManagerService.verifyAccountEmail(req.query.token).then(data=>{
                res.redirect("http://localhost:4200?mailWasVerified="+data);
                res.end();
            });
        });

        app.post('/phoneverify',async (req, res) =>{
            let data = await this.accountManagerService.checkToken(req.headers['x-access-token']);

            if(data){
               data = await this.accountManagerService.requestCode(data.account.telefone);
            }
            
            res.send(data);
            res.end();
        });

        app.post('/validateNumber',async (req, res) =>{
            let data = await this.accountManagerService.checkToken(req.headers['x-access-token']);
            
            if(data){
               data = await this.accountManagerService.verifyPhone(data.account.telefone, req.body.code, data);
            }
            
            res.send(data);
            res.end();
        });
    }
}

module.exports = new LoginController(AccountManagerService);