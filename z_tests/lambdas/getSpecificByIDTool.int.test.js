const getSpecificByIDTool = require('../../lambdas/endpoints/getSpecificByIDTool');
const Dynamo = require('../../lambdas/common/Dynamo');
const eventGenerator = require('../testUtils/eventGenerator'); 
const validators = require('../testUtils/validators'); 
const tableName = process.env.tableName;


describe('Get tools  integration tests', () => {
    test('It should take an ID  and return an API Gateway response', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'lkajsdlkasj',
            }
        })

        const res = await getSpecificByIDTool.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });

   test('It should return 400 if we dont pass an ID', async () => {
       const event = eventGenerator({});
       const res = await getSpecificByIDTool.handler(event);
       expect(res.statusCode).toBe(400); 
   });

   test('It should return 204 if it is an incorrect ID', async () => {
        const event = eventGenerator({
            pathParametersObject: {
                ID: 'lkajsdlkasj',
            }
        })

        const res = await getSpecificByIDTool.handler(event);

        
        expect(res.statusCode).toBe(204);
});

    test('Returns a 200 and the tools data when a valid ID', async () => {
         const ID = '329ajshdkjll';
         const tool =  {
            id: ID,
            title: "Notion",
            link: "https://notion.so",
            description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            tags: [
                "organization",
                "planning",
                "collaboration",
                "writing",
                "calendar"
            ]
        }
         await Dynamo.write(tool,process.env.tableName);
         const event = eventGenerator({
            pathParametersObject: {
                ID,
            }
        })
        const res = await getSpecificByIDTool.handler(event); 
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({user})
    });


});


