import sequelize from "../../src/database/client.database";

describe('Should get a connection from the database', () => {
    test('Should receive a connection and not fail',async() => {
        try {
            await sequelize.authenticate();
          } catch (error) {
            fail('Failed to connect to the DB')
          }
    })
})