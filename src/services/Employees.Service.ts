import Employees from "../models/Employees.model";

const createEmployee = async (id_company: number, rut_employee: string, full_name: string, email: string): Promise<Employees> => {
    const newEmployee = await Employees.create({
        id_company,
        rut_employee,
        full_name,
        email,
    });
    return newEmployee.toJSON();
};

const getAllEmployees = async (companyId: number): Promise<Employees[]> => {
    const employees = await Employees.findAll({
        where: {
            id_company: companyId
        }
    });
    return employees.map((employee) => employee.toJSON());
};

const getEmployeeById = async (employeeId: number): Promise<Employees | null> => {
    const employee = await Employees.findByPk(employeeId);
    return employee ? employee.toJSON() : null;
};

const updateEmployee = async (employeeId: number, companyId?: number, employeeRut?: string, fullName?: string, email?: string): Promise<Employees | null> => {
    const employee = await Employees.findByPk(employeeId);

    if (!employee) return null;
    if (companyId) employee.id_company = companyId;
    if (employeeRut) employee.rut_employee = employeeRut;
    if (fullName) employee.full_name = fullName;
    if (email) employee.email = email;

    await employee.save();
    return employee;
};


const deleteEmployee = async (employeeId: number): Promise<number> => {
    const deletedEmployeeCount = await Employees.destroy({
        where: {
            id: employeeId,
        },
    });
    return deletedEmployeeCount;
};

export {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
