
const Sequelize = require('sequelize');
const con = new Sequelize('pedeagora', 'pedeagorauser' , 'bM3rJv5vKOg9xmu5',{
        host:'localhost',
        dialect:'mariadb',
        logging:false
    },
    { 
        define: {
            freezeTableName: true
        },
       
    }
);


module.exports = con;