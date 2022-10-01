import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum EMessageType {
  SENT = "SENT",
  RECEIVED = "RECEIVED"
}

export declare class TMessage {
  readonly text?: string | null;
  readonly media?: string | null;
  readonly timestamp: number;
  readonly type: EMessageType | keyof typeof EMessageType;
  readonly sender: string;
  readonly receiver: string;
  constructor(init: ModelInit<TMessage>);
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly text?: string | null;
  readonly media?: string | null;
  readonly timestamp: number;
  readonly type?: EMessageType | keyof typeof EMessageType | null;
  readonly receiver: string;
  readonly sender: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly cognitoId: string;
  readonly recentChats?: (TMessage | null)[] | null;
  readonly avatarKey?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}