const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const id = event.requestContext.connectionId;

  await ddb.delete({
    TableName: process.env.TABLE_NAME,
    Key: {
      id
    }
  }).promise();

  return {};
};
