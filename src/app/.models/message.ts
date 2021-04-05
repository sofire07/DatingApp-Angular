export interface Message {
    id: number;
    senderId: string;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientUsername: string;
    recipientPhotoUrl: string;
    messageContent: string;
    messageSent: Date;
    messageRead?: Date;
  }