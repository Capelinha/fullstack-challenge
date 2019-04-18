'use strict';

const Response = require('./Response');

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});

module.exports.getPessoas = async (event, context) => {
	return await new Promise((resolve, reject) => {
		dynamoDb.scan({ TableName: DYNAMO_TABLE}, (err,res) => {
		  const resp = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      };

			if(err){
        resolve(Response.failure(err.message));
			}else{
				resolve(Response.success(res.Items));
			}
		});
	});
};
