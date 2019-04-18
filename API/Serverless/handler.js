'use strict';

const AWS = require('aws-sdk');
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2019-04-17',
    region: AWS_DEPLOY_REGION
});
const uuidv4 = require('uuid/v4');

module.exports.getPessoas = async (event, context) => {
	return await new Promise((resolve, reject) => {
		dynamoDb.scan({ TableName: DYNAMO_TABLE}, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not list all data: ${err.stack}`});
			}else{
				resolve({statusCode: 200, body: JSON.stringify(res.Items)});
			}
		});			
	});
};

module.exports.postPessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		let dados = JSON.parse(event.body);
		dados['id'] = uuidv4();

		dynamoDb.putItem({"Item" : dados, TableName: DYNAMO_TABLE}, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not insert: ${err.stack}`});
			}else{
				resolve({statusCode: 201, body: ''});
			}
		});
	});
};

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

		dynamoDb.updateItem(params, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not update: ${err.stack}`});
			}else{
				resolve({statusCode: 200, body: ''});
			}
		});
	});
};

module.exports.deletePessoa = async (event, context) => {
	return await new Promise((resolve, reject) => {
		dynamoDb.deleteItem({ TableName : DYNAMO_TABLE, Key: { "id": event.pathParameters['id']}}, (err,res) => {
			if(err){
				resolve({statusCode: 400, error: `Could not delete: ${err.stack}`});
			}else{
				resolve({statusCode: 200, body: ''});
			}
		});
	});
};



