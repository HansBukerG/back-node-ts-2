import 'dotenv/config.js';
import express, { NextFunction } from "express";
import cors from "cors";
import bodyParser from 'body-parser'
import { routerCompany } from './routes/Companies.router';
import { routerEmployee } from './routes/Employees.router';
import Companies from './models/Companies.model';
import Employees from './models/Employees.model';
import sequelize from './database/client.database';

const allowedOrigins = [
    '*',
];
//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};


// AllowedOrigins:   []string{"*"},
// AllowCredentials: true,
// AllowedMethods:   []string{"GET"},

const appInit = async () => {
    //app sync with PG database
    try {
        await sequelize.authenticate();
        await Companies.sync();
        await Employees.sync();

        routerCompany.use(cors(options))
        routerEmployee.use(cors(options))
        const app = express()
        console.log('app init');

        app.use(cors(options));
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(routerCompany);
        app.use(routerEmployee);

        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Rest ready to listen in port: ${port}`))
    } catch (error) {
        console.error(`App failed on start, error: ${error}`);
    }
}


export default appInit;

