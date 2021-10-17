
import { Dialect, Sequelize } from 'sequelize'

const dbName =   'dhando'  //process.env.DB_NAME as string
const dbUser =   'postgres' //process.env.DB_USER as string
const dbHost = 'localhost' //process.env.DB_HOST
const dbDriver =  'postgres' //process.env.DB_DRIVER as Dialect
const dbPassword =  'myPassword'//process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
})

sequelize.authenticate()
sequelize.sync({force:false });
export {sequelize}