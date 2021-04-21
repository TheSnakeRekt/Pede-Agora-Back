const db = require('../../Database/Database');
const ContaDTO = require("../../DTO/ContaDTO");
const UserDTO = require("../../DTO/UserDTO");
const MoradaDTO = require("../../DTO/MoradaDTO");
const AuthenticationSystem = require('./AuthenticationSystem');
const SigninDTO = require('../../DTO/SigninDTO');
const LocationFinderService = require('../Shared/LocationFinder.service');

class AccountManagerService extends AuthenticationSystem {


    constructor(contaRepository, clienteRepository, moradaRepository, locationFinderService){
        super();
        this.contaRepository = contaRepository;
        this.clienteRepository = clienteRepository;
        this.moradaRepository = moradaRepository;
        this.locationFinderService = locationFinderService;
    }

    async login(user){
        this.clienteRepository.sync();
        let userInstance = await this.clienteRepository.findOne({$or:[{email: user.name},{telefone:user.name}]}, {include:this.contaRepository});
        if(userInstance != null){
            return await super.authenticate(user.account.password, userInstance.password);
        }
        return false;
    }

    async signIn(data){
        this.contaRepository.sync();

        let password = await AuthenticationSystem.createPassword(data.password);
        let user = SigninDTO.mapper(data, password);
        user.Morada.geo = await this.locationFinderService.findGeoLoc(user.Morada);
        

        let conta = await this.contaRepository.create(ContaDTO.mapper(user.Conta));
        let userInstance = await this.clienteRepository.create(UserDTO.mapper(user.Utilizador));
        let morada = await this.moradaRepository.create(MoradaDTO.mapper(user.Morada));
        
        await userInstance.setContum(conta);
        await userInstance.addMorada(morada);
       
        let userDTO = UserDTO.mapper(userInstance);
        userDTO.morada = MoradaDTO.mapper(morada);
        return userDTO;
    }
}

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada, LocationFinderService);