const AWS = require('aws-sdk');


// Run DynamoDb offilne
let options = {}
if(process.env.IS_OFFLINE){
    options = {
        endpoint: 'http://localhost:8000', 
        region: 'localhost',
    
    }
}
// Unit Test for Dynamo.js
if(process.env.JEST_WORKER_ID){
    options = {
        endpoint: 'http://localhost:8000', 
        region: 'local-env',
        sslEnabled: false,
    }
}
const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },
    async write(data,TableName){
        if(!data.ID){
            throw Error('no ID on the data')
        }

        const params = {
            TableName, 
            Item: data
        }

        const res = await documentClient.put(params).promise(); 
        

        if(!res){
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
        }
        return data;
    },
    update: async ({TableName, primaryKey, primaryKeyValue, updateKey, updateValue}) => {
        const params = {
            TableName, 
            Key: { [primaryKey]: primaryKeyValue},
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            }
        }
        return await documentClient.update(params).promise()
    }, 
    delete: async(ID, tableName) => {
        const params = {
            TableName: tableName,
            Key: {
                ID,
            },
        };
        const res = await documentClient.delete(params).promise();
        if(!res){
            throw Error(`There was an error deleting the item  ${data.ID} in table ${tableName}`)
        }

       return res
    }, 
    scan: async({tableName}) => {
        if(!tableName){
            throw Error(`You need to inform a valid  tableName, actual ${tableName}`)
       
        }
        const params = {
            TableName: tableName,
        };

        items =  await documentClient.scan(params).promise();
        return items.Items
    }
};
module.exports = Dynamo;