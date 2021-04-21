module.exports = class SigninDTO {
    static mapper(signInInfo, hash){
       return{
            Utilizador:{
                nome:`${signInInfo.nome} ${signInInfo.apelido}`,
                telefone:signInInfo.telefone,
                email:signInInfo.email,
                nif:signInInfo.nif,
            },
            Conta: {
                password: hash,
                access:"USER"
            },
            Morada:{
                rua: signInInfo.morada, 
                codigoPostal: signInInfo.codigopostal,
                cidade: signInInfo.cidade,
                pais: 'PT'
            }
        };
    }
}