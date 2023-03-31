import { createCompany } from "../../src/services/Companies.Service";
import { createEmployee, getAllEmployees, getEmployeeById, deleteEmployee } from "../../src/services/Employees.Service";
import Employees from "../../src/models/Employees.model";
import Companies from "../../src/models/Companies.model";

describe('createEmployee', () => {
    let companyId: number;
    beforeAll(async () => {
        const companyData = {
            name: 'Test Company',
            rut: '18.389.654564564-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(
            companyData.name,
            companyData.rut,
            companyData.address,
            companyData.phone
        );
        companyId = newCompany.id;
    });

    it('should create a new employee', async () => {
        const employeeData = {
            id_company: companyId,
            rut_employee: '12.345.65465-9',
            full_name: 'John Doe',
            email: 'johndoe@test.com',
        };

        const newEmployee = await createEmployee(
            employeeData.id_company,
            employeeData.rut_employee,
            employeeData.full_name,
            employeeData.email
        );

        expect(newEmployee.id).toBeDefined();
        expect(newEmployee.id_company).toBe(companyId);
        expect(newEmployee.rut_employee).toBe(employeeData.rut_employee);
        expect(newEmployee.full_name).toBe(employeeData.full_name);
        expect(newEmployee.email).toBe(employeeData.email);
    });

    afterAll(async () => {
        await Employees.destroy({ where: { id_company: companyId } });
        await Companies.destroy({ where: { id: companyId } });
    });
});

describe('getAllEmployees', () => {
    let companyId: number;
    let employeeIds: number[];
  
    beforeAll(async () => {
      const companyData = {
        name: 'Test Company',
        rut: '12.345.678-9',
        address: '123 Main St',
        phone: '555-1234',
      };
      const newCompany = await createCompany(
        companyData.name,
        companyData.rut,
        companyData.address,
        companyData.phone
      );
      companyId = newCompany.id;
  
      const employeeData = [
        {
          id_company: companyId,
          rut_employee: '12.345.678-0',
          full_name: 'John Doe',
          email: 'johndoe@test.com',
        },
        {
          id_company: companyId,
          rut_employee: '12.345.678-1',
          full_name: 'Jane Doe',
          email: 'janedoe@test.com',
        },
        {
          id_company: companyId,
          rut_employee: '12.345.678-2',
          full_name: 'Bob Smith',
          email: 'bobsmith@test.com',
        },
      ];
  
      const createdEmployees = await Promise.all(
        employeeData.map((employee) =>
          createEmployee(
            employee.id_company,
            employee.rut_employee,
            employee.full_name,
            employee.email
          )
        )
      );
      employeeIds = createdEmployees.map((employee) => employee.id);
    });
  
    it('should return all employees for a given company', async () => {
      const employees = await getAllEmployees(companyId);
  
      expect(employees).toHaveLength(employeeIds.length);
  
      employeeIds.forEach((employeeId) => {
        expect(employees).toContainEqual(
          expect.objectContaining({ id: employeeId })
        );
      });
    });
  
    it('should return an empty array if no employees exist for a given company', async () => {
      await Employees.destroy({ where: { id_company: companyId } });
  
      const employees = await getAllEmployees(companyId);
  
      expect(employees).toEqual([]);
    });
  
    afterAll(async () => {
      await Employees.destroy({ where: { id_company: companyId } });
      await Companies.destroy({ where: { id: companyId } });
    });
  });
  

describe('getEmployeeById', () => {
    let companyId: number;
    let employeeId: number;

    beforeAll(async () => {
        const companyData = {
            name: 'Test Company',
            rut: '18.389.654564564-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(
            companyData.name,
            companyData.rut,
            companyData.address,
            companyData.phone
        );
        companyId = newCompany.id;
        const employeeData = {
            id_company: companyId,
            rut_employee: '12.345.65465-9',
            full_name: 'John Doe',
            email: 'johndoe@test.com',
        };

        const newEmployee = await createEmployee(
            employeeData.id_company,
            employeeData.rut_employee,
            employeeData.full_name,
            employeeData.email
        );

        employeeId = newEmployee.id;
    });

    it('should read an employee by id', async () => {
        try {
            const employee = await getEmployeeById(employeeId);
            if (employee) {
                expect(employee.id).toBe(employeeId);
                expect(employee.id_company).toBe(companyId);
                expect(employee.rut_employee).toBe('12.345.65465-9');
                expect(employee.full_name).toBe('John Doe');
                expect(employee.email).toBe('johndoe@test.com');
            }
        } catch (error) {
            fail('Test should not fail here');
        }
    });

    afterAll(async () => {
        await Employees.destroy({ where: { id_company: companyId } });
        await Companies.destroy({ where: { id: companyId } });
    });
});

describe('deleteEmployee', () => {
    let companyId: number;
    let employeeId: number;

    beforeAll(async () => {

        const companyData = {
            name: 'Test Company',
            rut: '18.389.654564564-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(
            companyData.name,
            companyData.rut,
            companyData.address,
            companyData.phone
        );
        companyId = newCompany.id;

        const employeeData = {
            id_company: companyId,
            rut_employee: '12.345.65465-9',
            full_name: 'John Doe',
            email: 'johndoe@test.com',
        };
        const newEmployee = await createEmployee(
            employeeData.id_company,
            employeeData.rut_employee,
            employeeData.full_name,
            employeeData.email
        );
        employeeId = newEmployee.id;
    });

    it('should delete an employee by id', async () => {

        const deletedEmployeeCount = await deleteEmployee(employeeId);

        expect(deletedEmployeeCount).toEqual(1);

        const employee = await getEmployeeById(employeeId);
        expect(employee).toBeNull();
    });

    afterAll(async () => {
        await Employees.destroy({ where: { id_company: companyId } });
        await Companies.destroy({ where: { id: companyId } });
    });
});


