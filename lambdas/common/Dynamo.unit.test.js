const Dynamo = require('./Dynamo');

test('Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object');
})

test('Dynamo has methods', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.update).toBe('function');
    expect(typeof Dynamo.delete).toBe('function');
    expect(typeof Dynamo.scan).toBe('function');
});


// Data to validate , see ofline dynamo to debug dynamo test
const validTableName = 'tools-table'; 
const data = {
    "id": "7385s7d8asdeaerf32",
    "title": "hotel",
    "link": "https://github.com/typicode/hotel",
    "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
    "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
};

test('Dynamo write works', async () => {
    expect.assertions(1);
    try{
        const res = await Dynamo.write(data,validTableName);
        expect(res).toBe(data);
    } catch (err){
        console.log("Error in dynamo write test", err); 
    }
});

test('Dynamo get works', async () => {
    const id = "7385s7d8asdeaerf32"
    expect.assertions(1);
    try{
        const res = await Dynamo.get(id, validTableName); 
        expect(res).toEqual(data);
    }   catch(error){
        console.log('error in Dynamo get', error)
    }
})

 

