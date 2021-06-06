const db = require('../../Database/Database');
const ContaDTO = require("../../DTO/ContaDTO");
const UserDTO = require("../../DTO/UserDTO");
const MoradaDTO = require("../../DTO/MoradaDTO");
const AuthenticationSystem = require('./AuthenticationSystem');
const SigninDTO = require('../../DTO/SigninDTO');
const LocationFinderService = require('../Shared/LocationFinder.service');
const AccountVerificationService = require('./AccountVerification.service');
const { Sequelize } = require('sequelize');
const moment = require('moment');

class AccountManagerService extends AuthenticationSystem {


    constructor(contaRepository, clienteRepository, moradaRepository, codigoRepository, locationFinderService, accountVerificationService){
        super();
        this.contaRepository = contaRepository;
        this.clienteRepository = clienteRepository;
        this.moradaRepository = moradaRepository;
        this.codigoRepository = codigoRepository;
        this.locationFinderService = locationFinderService;
        this.accountVerificationService = accountVerificationService;
    }

    async login(user){
 
        if(user.name){
          
            this.clienteRepository.sync();
            let userInstance = await this.clienteRepository.findOne({
                where:Sequelize.or({email: user.name}, {telefone:user.name}),  
                nest: true,
                include:[{model:this.contaRepository},{model:this.moradaRepository}]
            });
            
            if(userInstance != null){
                return await AuthenticationSystem.authenticate(user.account.password, userInstance.Contum.password, UserDTO.mapper(userInstance));
            }  
        }
        
        return false;
    }

    async checkToken(header){
        let data = AuthenticationSystem.checkToken(header)
        
        if(data){
            let userInstance = await this.clienteRepository.findOne({where:Sequelize.or({email: data.email}, {telefone:data.telefone}), nest: true, include:[this.contaRepository, this.moradaRepository]});
            let user = await AuthenticationSystem.sign(UserDTO.mapper(userInstance));
            return {
                access:true,
                account:user
            }
        }
        return false; 
    }

    async signIn(data){
        this.contaRepository.sync();

        let password = await AuthenticationSystem.createPassword(data.password);
        let user = SigninDTO.mapper(data, password);
        user.Morada.geo = await this.locationFinderService.findGeoLoc(user.Morada);
     
        let alreadyExists = await this.clienteRepository.findOne({where:Sequelize.or({email: user.Utilizador.email}, {telefone:user.Utilizador.telefone}),raw:true});
        
   
        if(alreadyExists){
            return false;
        }

        let token = AuthenticationSystem.randomToken();
        let conta = await this.contaRepository.create(ContaDTO.mapper(user.Conta, token));
        let userInstance = await this.clienteRepository.create(UserDTO.mapper(user.Utilizador));
        let morada = await this.moradaRepository.build(MoradaDTO.mapper(user.Morada));
        await morada[0].save()
    
        await userInstance.setContum(conta);
        await userInstance.addMorada(morada[0]);
        userInstance.MoradaId = morada[0].id;
        await userInstance.save();
        

        let userDTO = AuthenticationSystem.sign(UserDTO.mapper(userInstance));
        userDTO.morada = MoradaDTO.mapper(morada);

        this.accountVerificationService.sendEmailVerification(userInstance.email, userInstance.nome, token);

        return {
            access:true,
            account:userDTO
        };
    }

    async verifyAccountEmail(token){
        this.contaRepository.sync();
        let conta = await this.contaRepository.findOne({where:{verifyCode:token, verifiedMail:false},raw:true});

        if(!conta){
            return false;
        }
        
        if(!conta.verified){
            let [numberOfAffectedRows] = await this.contaRepository.update({verifiedMail:true, verifyCode:''},{where:{id:conta.id}});
            return (numberOfAffectedRows >= 1);
        }

        return conta.verifiedMail;
    }

    async verifyPhone(phone, code, data){
        this.codigoRepository.sync();

        let verify = await this.codigoRepository.findOne({where:{telefone:phone}});

        if(verify != null){
            let id = await verify.get('req_id');
            let result = await this.accountVerificationService.checkVerification(id, code);

            if(result.status == '0' || result.status == '6'){
                verify.validated = true;
                await verify.save();

                let account = await this.clienteRepository.findOne({where:Sequelize.and({email: data.account.email}, {telefone:phone}),nest: true, include:[this.contaRepository]});
                console.log(account)
                account.Contum.verified = true;
                await account.Contum.save();
                await account.save();
            }

            verify = result;
        }

        return verify;
    }

    async requestCode(phone){
        this.codigoRepository.sync();

        if(phone){
            let verify = await this.codigoRepository.findOne({where:{telefone:phone}});

            if(verify != null){
                if(verify.get('validated')){
                    return false;
                }

                let maxTime = await verify.get('expiry');
                let now = moment(new Date());

                if(now.isAfter(maxTime)){
                    return false;
                }

            }

            let result = await this.accountVerificationService.sendVerificationPhone(phone);
            let expiry = moment(new Date()).add(5,'m').utc(true);

            if(verify != null){
                
                verify.req_id = result.request_id;
               
                verify.expiry = expiry;
                await verify.save();
            }else{
                await this.codigoRepository.create({
                    req_id:result.request_id,
                    telefone:phone,
                    expiry:expiry,
                    validated:false
                });
            }


            return expiry;
        }

        return false;
    }

    async addAddress(token, address){
        if(token.access){
            this.contaRepository.sync();
            try {
                let userInstance = await this.clienteRepository.findOne({where:Sequelize.or({email: token.account.email}, {telefone:token.account.telefone}), nest: true, include:[this.contaRepository, this.moradaRepository]});
                let geo = await this.locationFinderService.findGeoLoc(address);
    
                if(!geo){
                    return false;
                }
        
                address.geo = geo;
        
                let morada = this.moradaRepository.build(MoradaDTO.mapper(address));

                await morada[0].save();
                await userInstance.addMorada(morada[0]);
                await userInstance.save();

               return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
        

        return false;
    }

    async removeAddress(token, address){
        if(token.access){
            try {
                let userInstance = await this.clienteRepository.findOne({where:Sequelize.or({email: token.account.email}, {telefone:token.account.telefone}), nest: true, include:[this.contaRepository, this.moradaRepository]});
           
                let morada = await userInstance.Moradas.find(elem=> elem.get().name == address);

                await morada.destroy();
                await userInstance.save();

               return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
        

        return false;
    }

    async changePassword(token, oldPsw, newPsw){
        console.log(oldPsw, newPsw)
        if(token.access){
            try {
                let userInstance = await this.clienteRepository.findOne({where:Sequelize.or({email: token.account.email}, {telefone:token.account.telefone}), nest: true, include:[this.contaRepository, this.moradaRepository]});
                let conta = await userInstance.get("Contum");
                
                let isValid = await AuthenticationSystem.authenticate(conta.password, oldPsw);

                if(isValid){
                    conta.password = await AuthenticationSystem.createPassword(newPsw);
                    await conta.save();
                    return true;
                }

                return false;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
}

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada, db.CodigosVerificaTelemovel, LocationFinderService, AccountVerificationService);