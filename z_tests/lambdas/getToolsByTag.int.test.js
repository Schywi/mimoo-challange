const getToolsByTag = require('../../lambdas/endpoints/getToolsByTag');
const Dynamo = require('../../lambdas/common/Dynamo');
const eventGenerator = require('../testUtils/eventGenerator'); 
const validators = require('../testUtils/validators'); 
const tableName = process.env.tableName;


describe('Get tools by tag integration tests', () => {
    test('It should return an array with a lenght > 0', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                tagName: 'domain',
            }
        })

        const res = await getToolsByTag.handler(event);

        console.log("res data", res)
        expect(res.statusCode).toBe(200); 
        expect(res.lenght).not.toBe(0)
       
    });

 
  

});


