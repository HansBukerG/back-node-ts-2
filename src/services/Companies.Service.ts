import Companies from "../models/Companies.model";
import Employees from "../models/Employees.model";

const createCompany = async (name: string, rut: string, address: string, phone: string): Promise<Companies> => {
    const company = await Companies.create({
        name,
        rut,
        address,
        phone,
    });
    return company;
};

const getCompanies = async (): Promise<Companies[]> => {
    const companies = await Companies.findAll();
    return companies;
};

const getCompanyById = async (companyId: number): Promise<Companies | null> => {
    const company = await Companies.findByPk(companyId);
    return company;
};

const deleteCompany = async (companyId: number): Promise<number> => {
    await Employees.destroy({
        where: {
            id_company: companyId,
        },
    })
    const deletedCompany = await Companies.destroy({
        where: {
            id: companyId,
        },
    });


    return deletedCompany;
};

export {
    createCompany,
    getCompanies,
    getCompanyById,
    deleteCompany,
};
