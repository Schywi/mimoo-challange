const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.tagName) {
        // failed without an game
        return Responses._400({ message: 'missing the tagname from the path' });
    }

    const tagName = event.pathParameters.tagName;
    const allItems = await Dynamo.scan({
        tableName
    })
   const newItemsArr =  allItems.filter(eachTask => {
       if(eachTask.tags !== undefined){
            return eachTask.tags.includes(`${tagName}`)
       }
      
    })




    return Responses._200({ newItemsArr });
};