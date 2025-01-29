import { IUser } from "./userType";

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
}

export interface IConvo {
  _id: string;
  participants: IUser[]; // array of userIds
  messages: IMessage[];
}

export interface IRecipient {
  recipientId: string;
  username: string;
}

export interface IConvoState {
  recipient: IRecipient | null;
  convoId?: string | null;
  messages: IMessage[];
  createNew?: boolean;
  isSet?: boolean;
}

export interface IMessageInput {
  // TODO
}
