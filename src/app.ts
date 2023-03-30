import 'dotenv/config.js';
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from 'body-parser'
import { routerCompany } from './routes/Companies.router';
import { routerEmployee } from './routes/Employees.router';
import Companies from './models/Companies.model';
import Employees from './models/Employees.model';
import sequelize from './database/client.database';

const appInit = () => {
    //app sync with PG database
    sequelize.authenticate();
    Companies.sync();
    Employees.sync();

    const app = express()
    console.log('app init');
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(routerCompany);
    app.use(routerEmployee);

    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Rest ready to listen in port: ${port}`))

}


export default appInit;

