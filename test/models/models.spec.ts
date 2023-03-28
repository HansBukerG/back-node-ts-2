import Companies from '../../src/models/Companies.model'
import Employees from '../../src/models/Employees.model'

describe('Should Sync() all Models in DB', () => {
    test('Should Sync() all Models in dataBase', async () => {
        try {
            // await Category.sync()
            await Companies.sync();
            await Employees.sync();
            console.log('All the schemas have been Syncronized into the database')
        } catch (error) {
            console.log('Error in task: ', error)
            fail('Something has failed')
        } finally {
            // await client.close()
        }
    })
})