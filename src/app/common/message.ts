
export class Message {
  id: number;
  message: string;
  wasRead: boolean;
  senderName: string;
  receiverName: string;
  dateCreated: string;

  constructor(message, senderName, receiverName, date) {
    this.message = message;
    this.wasRead = false;
    this.senderName = senderName;
    this.receiverName = receiverName;
    this.dateCreated = date;
  }

}
