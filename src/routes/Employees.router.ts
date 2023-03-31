import { Router } from "express"
import { deleteEmployeeId, postEmployee } from "../controllers/Employees.controller";

const routerEmployee = Router();

routerEmployee.post('/employee/post', postEmployee);
routerEmployee.delete('/employee/delete/:id', deleteEmployeeId);

export { routerEmployee }