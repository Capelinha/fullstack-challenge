'use strict';

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});
const uuidv4 = require('uuid/v4');

module.exports.postPessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		let dados = JSON.parse(event.body);
		dados['id'] = uuidv4();

    const params = {
      TableName: DYNAMO_TABLE,
      ExpressionAttributeNames: {
        "#id": "id",
        "#nome": "nome",
        "#sobrenome": "sobrenome",
        "#participacao": "participacao"
      },
      ExpressionAttributeValues: {
        ":id": dados['id'],
        ":n": dados['nome'],
        ":s": dados['sobrenome'],
        ":p": dados['participacao']
      },
      Item: {
        "#id" : ":id",
        "#nome" : ":n",
        "#sobrenome" : ":s",
        "#participacao" : ":p"
      }
    };

		dynamoDb.put({"Item" : dados, TableName: DYNAMO_TABLE}, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not insert: ${err.stack}`});
			}else{
				resolve({statusCode: 201, body: ''});
			}
		});
	});
};




