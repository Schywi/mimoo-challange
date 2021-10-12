const createTools = require('../../lambdas/endpoints/createTools');
const eventGenerator = require('../testUtils/eventGenerator'); 
const validators = require('../testUtils/validators'); 
const tableName = process.env.tableName;


describe('Create tools integration tests', () => {
    test('It should take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
                "id":5
            }
        })

        const res = await createTools.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    })

    test('Should return a 200 with the tool added if tool is valid', async () => {
        const event = eventGenerator({
            body: {
                "id": "aksldjalksjkl",
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
            }
        }); 
        const res = await createTools.handler(event);

        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            toolAdded: {
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
                "id": "aksldjalksjkl"
            }
        });
    });
});



