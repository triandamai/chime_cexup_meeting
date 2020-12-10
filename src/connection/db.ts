import {createConnection} from "mysql2"
import Connection = require("mysql2/typings/mysql/lib/Connection")
import * as dotenv from 'dotenv'
dotenv.config()

class Database{
    public db:Connection
    constructor(){
        this.db = createConnection({
            host    : process.env.DB_HOST,
            user    : process.env.DB_USER,
            database: process.env.DB_NAME
        })
    }
}

export default new Database().db