const db = require('../../Database/Database');
const ContaDTO = require("../../DTO/ContaDTO");
const UserDTO = require("../../DTO/UserDTO");
const MoradaDTO = require("../../DTO/MoradaDTO");
const AuthenticationSystem = require('./AuthenticationSystem');
const SigninDTO = require('../../DTO/SigninDTO');
const LocationFinderService = require('../Shared/LocationFinder.service');
const AccountVerificationService = require('./AccountVerification.service');
const { Sequelize } = require('sequelize');

class AccountManagerService extends AuthenticationSystem {


    constructor(contaRepository, clienteRepository, moradaRepository, locationFinderService, accountVerificationService){
        super();
        this.contaRepository = contaRepository;
        this.clienteRepository = clienteRepository;
        this.moradaRepository = moradaRepository;
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
        let conta = await this.contaRepository.findOne({where:{verifyCode:token, verified:false},raw:true})
        if(!conta){
            return false;
        }
        
        if(!conta.verified){
            let [numberOfAffectedRows] = await this.contaRepository.update({verified:true, verifyCode:''},{where:{id:conta.id}});
            return (numberOfAffectedRows >= 1);
        }

        return conta.verified;
    }

    async verifyAccountPhone(code, phone){

    }

    async addAddress(token, address){
        if(token.access){
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
}

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada, LocationFinderService, AccountVerificationService);