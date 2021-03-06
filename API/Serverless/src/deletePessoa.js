'use strict';

const Response = require('./Response');

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});

module.exports.deletePessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		dynamoDb.delete({ ReturnValues : "ALL_OLD" ,TableName : DYNAMO_TABLE, Key: { "id": event.pathParameters['id']}}, (err,res) => {

		  if(err){
			  resolve(Response.failure(err.message));
			}else{
        if(res.Attributes === undefined){
          resolve(Response.notFound());
        }else {
          resolve(Response.success());
        }
			}
		});
	});
};



