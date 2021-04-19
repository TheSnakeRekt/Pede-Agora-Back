const db = require('../../Database/Database');
const ContaDTO = require("../../DTO/ContaDTO");
const UserDTO = require("../../DTO/UserDTO");
const MoradaDTO = require("../../DTO/MoradaDTO");

class AccountManagerService extends AuthenticationSystem {
    constructor(contaRepository, clienteRepository, moradaRepository){
        this.contaRepository = contaRepository;
        this.clienteRepository = clienteRepository;
        this.moradaRepository = moradaRepository;
    }

    async login(user){
        this.clienteRepository.sync();
        let userInstance = await this.clienteRepository.findOne({where:{$or:[{telefone:user.account},{email: user.account}], include:this.contaRepository}})

        return await super.authenticate(user.password, userInstance.password);
    }

    async signIn(user){
        this.contaRepository.sync();
        let password = await super.createPassword(user.password);
        let conta = await this.contaRepository.create(ContaDTO.mapper(password));
        let user = await this.clienteRepository.create(UserDTO.mapper(user));
        let morada = await this.moradaRepository.create(MoradaDTO.mapper(user.Morada));
        await user.setConta(conta);
        await user.setMorada(morada);

        return UserDTO.mapper(user);
    }
}

module.exports = new AccountManagerService(db.Conta, db.Cliente, db.Morada);