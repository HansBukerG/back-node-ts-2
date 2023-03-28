import 'dotenv/config.js';
import { Request, Response } from 'express';
import Employees from '../models/Employees.model';
import { createCompany, getCompanies, getCompanyById } from '../services/Companies.Service';
import { getAllEmployees } from '../services/Employees.Service';

const postCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        const companyData = req.body;
        const newCompany = await createCompany(
            companyData.name,
            companyData.rut,
            companyData.address,
            companyData.phone,
        )
        res.status(200).json({ company: newCompany });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
        const allCompanyData = await getCompanies();
        res.status(200).json({ company: allCompanyData });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCompanyId = async (req: Request, res: Response): Promise<void> => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const allCompanyData = await getCompanyById(companyId);
        let employeeData!: Employees[];
        if (allCompanyData) {
            employeeData = await getAllEmployees(allCompanyData.id);
        } else {
            employeeData = [];
        }
        res.status(200).json(
            {
                company: allCompanyData,
                employees: employeeData
            });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { postCompany, getAllCompanies, getCompanyId }