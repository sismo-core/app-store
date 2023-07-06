import { LoggerService } from "@/src/services/logger-service/logger-service";
import {
  TelegramBotInterface,
  TelegramBotService,
} from "@/src/services/telegram-bot-service/telegram-bot-service";
import {
  JoinRequest,
  Message,
  TelegramBotServiceConstructor,
} from "@/src/services/telegram-bot-service/types";
import axios from "axios";

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
    const approveURL = new URL(`${this._getUrl()}/approveChatJoinRequest`);
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
