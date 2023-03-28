import { Router } from "express"
import { postEmployee, updateEmployeeController } from "../controllers/Employees.controller";

const routerEmployee = Router();

routerEmployee.post('/employee/post', postEmployee);
routerEmployee.post('/employee/update/:id', updateEmployeeController)

export { routerEmployee }