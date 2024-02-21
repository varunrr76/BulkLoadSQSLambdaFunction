const AWS = require('aws-sdk');

const QUEUE_URL = process.env.DEMO_QUEUE;

function messagesGenerator(messagesCount) {
  let messages = [];
  for (let i = 1; i <= messagesCount; i++) {
    messages.push(i.toString());
  }
  return messages;
}

exports.handler = async function (event, context) {

  const messagesCount = event['messagesCount'] || 20;

  const messages = messagesGenerator(messagesCount);

  var sqs = new AWS.SQS();

  const response = await Promise.all(messages.map((message) => sqs.sendMessage({ MessageBody: message, QueueUrl: QUEUE_URL }).promise()));

  return response;
}

