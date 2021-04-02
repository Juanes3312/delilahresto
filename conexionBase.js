const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/delilah_resto'
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
    console.log('conectando')
}).catch(err => {
    console.error('error de conexion', err)
})/*.finally(() => {
    sequelize.close();
})*/

module.exports = sequelize;