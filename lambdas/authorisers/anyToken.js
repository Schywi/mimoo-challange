const Dynamo = require('../common/Dynamo');
const tokenTableName = process.env.tokenTableName;

exports.handler = async event => {
    console.log('event', event);

    const tokenID = 
    (event.headers && 
            (event.headers['X-Amz-Security-Token'] || 
            event.headers['x-amz-security-token']))  || event.authorizationToken;
    if(!tokenID){
        console.log('Could not find a token on the event');
        return generatePolicy({allow: false})
    }

    // Verify if token exist
    if(!tokenID){
        console.log('Could not find a token on the event');
        return generatePolicy({allow: false});
    }

    try{
        const token = await Dynamo.get(tokenID, tokenTableName);

        // check if token exist
        if(!token){
            console.log(`No token for token ID of ${tokenID}`)
            return generatePolicy({allow: false});
        }

        // check when token expires
        if(!token.expiryDate && token.expiryDate < Date.now()){
            console.log('After expiry date');
            return generatePolicy({allow: false});
        }
        return generatePolicy({allow: true})

    } catch (err){
        console.log('Error with authentication', error);
        return generatePolicy({allow: false});
    }




}

//  It stops the request going through and access the lambda endpoint (IAM documentation)
const generatePolicy = ({allow}) => {
    return {
        principalId: 'token', 
        policyDocument: {
            Version: '2012-10-17', 
            Statement: {
                Action: 'execute-api:Invoke', 
                Effect: allow ? 'Allow' : 'Deny', 
                Resource: '*',
            }
        }
    }
}