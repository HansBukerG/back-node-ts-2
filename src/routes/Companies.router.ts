import { Router } from "express";
import { postCompany, getAllCompanies, getCompanyId, deleteCompanyById } from "../controllers/Companies.controller";

const routerCompany = Router();

routerCompany.post('/company/post', postCompany);
routerCompany.get('/company/get', getAllCompanies);
routerCompany.get('/company/get/:id', getCompanyId);
routerCompany.delete('/company/delete/:id', deleteCompanyById);


export { routerCompany }