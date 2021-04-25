
const Sequelize = require('sequelize');
const con = new Sequelize('pedeagoratest', 'pedeagorauser' , 'bM3rJv5vKOg9xmu5',{
        host:'localhost',
        dialect:'mariadb',
    },
    { 
        define: {
            freezeTableName: true
        },
       
    }
);


module.exports = con;