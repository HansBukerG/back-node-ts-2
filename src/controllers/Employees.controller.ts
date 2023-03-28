import 'dotenv/config.js';
import { Request, Response } from 'express';
import { createEmployee, updateEmployee } from '../services/Employees.Service';

const postEmployee = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;
        const newEmployee = await createEmployee(reqData.idCompany, reqData.rutEmployee, reqData.fullName, reqData.email);
        res.status(200).json({ employee: newEmployee })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateEmployeeController = async (req: Request, res: Response): Promise<void> => {
    const employeeId: number = parseInt(req.params.id);
    const companyId: number = req.body.companyId;
    const employeeRut: string = req.body.employeeRut;
    const fullName: string = req.body.fullName;
    const email: string = req.body.email;

    try {
        const updatedEmployee = await updateEmployee(
            employeeId,
            companyId,
            employeeRut,
            fullName,
            email
        );

        if (updatedEmployee) {
            res.status(200).json({ employee: updatedEmployee });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    postEmployee,
    updateEmployeeController
}