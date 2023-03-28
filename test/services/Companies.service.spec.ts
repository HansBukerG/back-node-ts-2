import { createCompany, getCompanies, updateCompany, deleteCompany, getCompanyById } from '../../src/services/Companies.Service';
import Companies from '../../src/models/Companies.model';

describe('getCompanies', () => {
    let companyId:number;
    beforeAll(async()=>{
        const companyData = {
            name: 'Test Company',
            rut: '18.389.311-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(companyData.name, companyData.rut, companyData.address, companyData.phone);
        companyId = newCompany.id;
    })

    it('should return all companies', async () => {
        try {
            const companyList = await getCompanies();
        } catch (error) {
            fail('Test should not fail here')
        }
    });
    afterAll(async () => {
        await Companies.destroy({ where: { id: companyId } });
    });
});

describe('getCompanyById', () => {
    let companyId:number;
    beforeAll(async()=>{
        const companyData = {
            name: 'Test Company',
            rut: '18.389.3165-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(companyData.name, companyData.rut, companyData.address, companyData.phone);
        companyId = newCompany.id;
    })

    it('should return a company based on his id', async () => {
        try {
            await getCompanyById(companyId);
        } catch (error) {
            fail('Test should not fail here')
        }
    });

    afterAll(async () => {
        await Companies.destroy({ where: { id: companyId } });
    });
});

describe('createCompany', () => {

    let companyId:number;

    it('should create a new company', async () => {
        const companyData = {
            name: 'Test Company',
            rut: '18.389.315656-5',
            address: '123 Main St',
            phone: '555-1234',
        };

        const newCompany = await createCompany(companyData.name, companyData.rut, companyData.address, companyData.phone);

        companyId = newCompany.id;

        expect(newCompany).toBeInstanceOf(Companies);
        expect(newCompany.id).toBeDefined();
        expect(newCompany.name).toBe('Test Company');
        expect(newCompany.phone).toBe('555-1234');
        expect(newCompany.address).toBe('123 Main St');
    });

    afterAll(async () => {
        await Companies.destroy({ where: { id: companyId } });
    });
});

// describe('updateCompany', () => {
//     let companyId:number;

//     beforeAll(async()=>{
//         const companyData = {
//             name: 'Test Company',
//             rut: '18.389.381-5',
//             address: '123 Main St',
//             phone: '555-1234',
//         };

//         const newCompany = await createCompany(
//             companyData.name,
//             companyData.rut,
//             companyData.address,
//             companyData.phone
//         );
//         companyId = newCompany.id;
//     })

//     it('should update an existing company', async () => {
//         const updatedCompanyData = {
//             name: 'Updated Company',
//             rut: '12.345.678-9',
//             address: '456 Second St',
//             phone: '555-5678',
//         };
//         const updatedCompany = await updateCompany(
//             companyId,
//             updatedCompanyData.name,
//             updatedCompanyData.rut,
//             updatedCompanyData.address,
//             updatedCompanyData.phone
//         );

//         if (updatedCompany) {
//             expect(updatedCompany.id).toBe(companyId);
//             expect(updatedCompany.name).toBe(updatedCompanyData.name);
//             expect(updatedCompany.rut).toBe(updatedCompanyData.rut);
//             expect(updatedCompany.address).toBe(updatedCompanyData.address);
//             expect(updatedCompany.phone).toBe(updatedCompanyData.phone);
//         } else {
//             fail('There is an error in test updateCompany')
//         }

//     });

    // it('should return null if the company does not exist', async () => {
    //     const updatedCompany = await updateCompany(
    //         9999,
    //         'Updated Company',
    //         '12.345.678-9',
    //         '456 Second St',
    //         '555-5678'
    //     );

    //     expect(updatedCompany).toBeNull();
    // });

//     afterAll(async () => {
//         await Companies.destroy({ where: { id: companyId } });
//     });
// });

describe('deleteCompany', () => {
    let companyId: number;
    beforeAll(async () => {
        const companyData = {
            name: 'Test Company',
            rut: '18.389.381-5',
            address: '123 Main St',
            phone: '555-1234',
        };
        const newCompany = await createCompany(companyData.name, companyData.rut, companyData.address, companyData.phone);
        companyId = newCompany.id;
    });

    it('should delete a company by id', async () => {
        const deletedCompany = await deleteCompany(companyId);
        expect(deletedCompany).toBeTruthy();
        const company = await getCompanyById(companyId);
        expect(company).toBeNull();
    });

    afterAll(async () => {
        await Companies.destroy({
            where: { id: companyId },
        });
    });
});