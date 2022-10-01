// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EMessageType = {
  "SENT": "SENT",
  "RECEIVED": "RECEIVED"
};

const { Message, User, TMessage } = initSchema(schema);

export {
  Message,
  User,
  EMessageType,
  TMessage
};