const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');


const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const deleteItem = await Dynamo.delete(ID,tableName).catch(err => {
        console.log('error in dynamo delete', err); 
        Responses._400({ message:  `${err}` });
        return err;
    })


    return Responses._200({ deleteItem });
};