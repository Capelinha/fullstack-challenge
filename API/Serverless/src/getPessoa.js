'use strict';

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});

module.exports.getPessoa = async (event, context) => {
  return await new Promise((resolve, reject) => {

    const params = {
      TableName: DYNAMO_TABLE,
      Key: {
        "id": event.pathParameters['id']
      }
    };

    dynamoDb.get(params, (err,res) => {
      if(err){
        resolve({statusCode: 400, error: `Could not get data: ${err.stack}`});
      }else{
        resolve({statusCode: 200, body: JSON.stringify(res.Item)});
      }
    });
  });
};



