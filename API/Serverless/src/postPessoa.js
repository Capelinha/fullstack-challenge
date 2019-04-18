'use strict';

const Pessoa = require('./Pessoa');
const Response = require('./Response');

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

    const p = new Pessoa(dados);
    const {valid, errors} = p.validate();

    if (valid) {
      dados['id'] = uuidv4();
      dynamoDb.put({"Item": dados, TableName: DYNAMO_TABLE}, (err, res) => {

        if (err) {
          resolve(Response.failure(err.message));
        } else {
          resolve(Response.created());
        }
      });

    } else {
      resolve(Response.badRequest(errors));
    }
  });
};
