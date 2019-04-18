'use strict';

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});

module.exports.deletePessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		dynamoDb.delete({ TableName : DYNAMO_TABLE, Key: { "id": event.pathParameters['id']}}, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not delete: ${err.stack}`});
			}else{
				resolve({statusCode: 200, body: ''});
			}
		});
	});
};



