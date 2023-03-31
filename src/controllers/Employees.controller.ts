import 'dotenv/config.js';
import { Request, Response } from 'express';
import { createEmployee, deleteEmployee } from '../services/Employees.Service';

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

const deleteEmployeeId = async (req: Request, res: Response) => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const rows = await deleteEmployee(companyId);
        res.status(200).json({ message: `${rows} affected!` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    postEmployee,
    deleteEmployeeId
}