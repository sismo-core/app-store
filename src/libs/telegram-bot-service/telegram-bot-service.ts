import { LoggerService } from "@/src/libs/logger-service/logger-service";
import {
  JoinRequest,
  Message,
  TelegramBotServiceConstructor,
} from "@/src/libs/telegram-bot-service/types";
import axios from "axios";

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

export class TelegramAPIBotService extends TelegramBotService implements TelegramBotInterface {
  private _telegramBotToken: string;
  private _loggerService: LoggerService;

  constructor({ telegramBotToken, loggerService }: TelegramBotServiceConstructor) {
    super();
    this._loggerService = loggerService;
    this._telegramBotToken = telegramBotToken;
  }

  public async sendMessage(message: Message): Promise<void> {
    const sendMessageURL = new URL(`${this._getUrl()}/sendMessage`);
    sendMessageURL.searchParams.append("chat_id", message.groupId);
    sendMessageURL.searchParams.append("reply_to_message_id", message.messageId);
    sendMessageURL.searchParams.append("text", message.text);
    this._loggerService.debug(`Sending message: ${sendMessageURL.toString()}`);
    await axios.get(sendMessageURL.toString());
  }

  public async approveChatJoinRequest(request: JoinRequest): Promise<void> {
    const approveURL = new URL(`${this._getUrl()}}/approveChatJoinRequest`);
    approveURL.searchParams.append("chat_id", request.groupId);
    approveURL.searchParams.append("user_id", request.userId);
    this._loggerService.debug(`Sending approveChatJoinRequest: ${approveURL.toString()}`);
    await axios.get(approveURL.toString());
  }

  public async declineChatJoinRequest(request: JoinRequest): Promise<void> {
    const declineURL = new URL(`${this._getUrl()}/declineChatJoinRequest`);
    declineURL.searchParams.append("chat_id", request.groupId);
    declineURL.searchParams.append("user_id", request.userId);
    this._loggerService.debug(`Sending declineChatJoinRequest: ${declineURL.toString()}`);
    await axios.get(declineURL.toString());
  }

  private _getUrl(): string {
    return `https://api.telegram.org/bot${this._telegramBotToken}`;
  }
}
