const AWS = require('aws-sdk');
const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
  endpoint: process.env.API_CONNECTIONS_ENDPOINT
});
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const body = event.body;

  const { Items: items } = await ddb.scan({
    TableName: process.env.TABLE_NAME
  }).promise();

  for (const item of items) {
    const connectionId = item.id;

    await apigatewaymanagementapi.postToConnection({
      ConnectionId: connectionId,
      Data: body
    }).promise();
  }

  return {};
};
