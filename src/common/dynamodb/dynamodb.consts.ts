export interface DynamoDBParams {
  TableName: string;
  Key?: string;
  Item?: any;
  IndexName?: string;
  KeyConditionExpression?: string;
  ExpressionAttributeValues?: any;
}
