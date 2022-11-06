import { AWS_DEFAULT_REGION, AWS_DYNAMODB_ENDPOINT } from '../env';
import { DynamoDBParams } from './dynamodb.consts';

const AWS = require('aws-sdk');

export const TABLES = {
  MESIBOT_VOTES: 'mesibot-votes'
};

if (AWS_DYNAMODB_ENDPOINT && AWS_DEFAULT_REGION) {
  AWS.config.update({
    region: AWS_DEFAULT_REGION,
    endpoint: AWS_DYNAMODB_ENDPOINT
  });
}

export const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

export const putItem = async (tableName: string, item: any, conditionExpression?: any) => {
  const params: DynamoDBParams = {
    TableName: tableName,
    Item: item,
    ...(conditionExpression && { ConditionExpression: conditionExpression })
  };
  await dynamoDBClient.put(params).promise();
  return item;
};

export const patchItem = async (tableName, key, item) => {
  const oldItem = await getItem(tableName, key).catch(console.error);
  const updatedItem = await putItem(tableName, { ...oldItem, ...item }).catch(console.error);
  return updatedItem;
};

export const getItem = async (tableName: string, key: any): Promise<any> => {
  const params: DynamoDBParams = {
    TableName: tableName,
    Key: key
  };
  const { Item } = await dynamoDBClient.get(params).promise();
  return Item;
};

export const query = async (params: DynamoDBParams) => {
  const { Items: items, Count: count } = await dynamoDBClient.query(params).promise();
  return { items, count };
};

export default {
  putItem,
  getItem,
  query
};
