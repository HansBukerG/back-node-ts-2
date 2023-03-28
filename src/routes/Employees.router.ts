import { Router } from "express"
import { postEmployee } from "../controllers/Employees.controller";

const routerEmployee = Router();

routerEmployee.post('/employee/post', postEmployee);

export { routerEmployee }