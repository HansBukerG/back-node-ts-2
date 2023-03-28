import Companies from "../models/Companies.model";

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

const updateCompany = async (companyId: number, name?: string, rut?: string, address?: string, phone?: string): Promise<Companies | null> => {
    const company = await Companies.findByPk(companyId);

    if (!company) return null;
    if (name) company.name = name;
    if (rut) company.rut = rut;
    if (address) company.address = address;
    if (phone) company.phone = phone;

    await company.save();
    return company.toJSON();
};

const deleteCompany = async (companyId: number): Promise<number> => {
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
    updateCompany,
    deleteCompany,
};
