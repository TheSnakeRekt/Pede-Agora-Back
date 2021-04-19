const db = require('../../Database/Database');
const ContaDTO = require("../../DTO/ContaDTO");
const UserDTO = require("../../DTO/UserDTO");
const MoradaDTO = require("../../DTO/MoradaDTO");
const AuthenticationSystem = require('./AuthenticationSystem');

class AccountManagerService extends AuthenticationSystem {


    constructor(contaRepository, clienteRepository, moradaRepository){
        super();
        this.contaRepository = contaRepository;
        this.clienteRepository = clienteRepository;
        this.moradaRepository = moradaRepository;
    }

    async login(user){
        this.clienteRepository.sync();
        let userInstance = await this.clienteRepository.findOne({$or:[{email: user.name},{telefone:user.name}]}, {include:this.contaRepository});
        if(userInstance != null){
            return await super.authenticate(user.account.password, userInstance.password);
        }
        return false;
    }

    async signIn(user){
        this.contaRepository.sync();
        let password = await super.createPassword(user.password);
        let conta = await this.contaRepository.create(ContaDTO.mapper(password));
        let userInstance = await this.clienteRepository.create(UserDTO.mapper(user));
        let morada = await this.moradaRepository.create(MoradaDTO.mapper(user.Morada));

        await userInstance.setConta(conta);
        await userInstance.setMorada(morada);

        return UserDTO.mapper(userInstance);
    }
}

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada);