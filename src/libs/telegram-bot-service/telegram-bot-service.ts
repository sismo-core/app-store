import { JoinRequest, Message } from "@/src/libs/telegram-bot-service/types";

export interface TelegramBotInterface {
  sendMessage(message: Message): Promise<void>;
  approveChatJoinRequest(request: JoinRequest): Promise<void>;
  declineChatJoinRequest(request: JoinRequest): Promise<void>;
  parseMessage(update: any): null | Message;
  parseJoinRequest(update: any): null | JoinRequest;
}

export class TelegramBotService {
  public parseMessage(update: any): null | Message {
    if (!(update["message"] && update["message"]["text"])) {
      return null;
    }
    return {
      messageId: String(update["message"]["message_id"]),
      groupId: String(update["message"]["chat"]["id"]),
      text: update["message"]["text"],
    };
  }

  public parseJoinRequest(update: any): null | JoinRequest {
    if (!update["chat_join_request"]) {
      return null;
    }
    return {
      groupId: String(update["chat_join_request"]["chat"]["id"]),
      groupTitle: String(update["chat_join_request"]["chat"]["title"]),
      userId: String(update["chat_join_request"]["from"]["id"]),
      username: update["chat_join_request"]["from"]["username"],
    };
  }
}
