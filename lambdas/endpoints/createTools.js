const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const { v4: uuidv4 } = require('uuid');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);


  
    const addTool = JSON.parse(event.body);
    addTool.ID = uuidv4();

    const toolAdded = await Dynamo.write(addTool,tableName).catch(err => {
        console.log('error in dynamo write', err); 
        return null;
    })
    

    if (!toolAdded) {
        return Responses._400({ message: 'Failed to create new Tool' });
    }

    return Responses._200({ toolAdded });
};