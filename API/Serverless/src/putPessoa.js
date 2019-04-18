'use strict';

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});

module.exports.putPessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		let dados = JSON.parse(event.body);

		const params = {
			TableName: DYNAMO_TABLE,
			Key: {
				"id": event.pathParameters['id']
			},
			UpdateExpression: "set #nome = :n, #sobrenome = :s, #participacao = :p",
			ExpressionAttributeNames: {
				"#nome": "nome",
				"#sobrenome": "sobrenome",
				"#participacao": "participacao"
			},
			ExpressionAttributeValues: {
				":id": event.pathParameters['id'],
				":n": dados['nome'],
				":s": dados['sobrenome'],
				":p": dados['participacao']
			},
			ConditionExpression: "id = :id"

		};

		dynamoDb.update(params, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not update: ${err.stack}`});
			}else{
				resolve({statusCode: 200, body: ''});
			}
		});
	});
};



