import {
  TelegramBotInterface,
  TelegramBotService,
} from "@/src/services/telegram-bot-service/telegram-bot-service";
import { JoinRequest, Message } from "@/src/services/telegram-bot-service/types";

export class MockedTelegramBotService extends TelegramBotService implements TelegramBotInterface {
  private _messageSent: Message[] = [];
  private _joinRequestApproved: JoinRequest[] = [];
  private _joinRequestDeclined: JoinRequest[] = [];

  public async sendMessage(message: Message): Promise<void> {
    this._messageSent.push(message);
  }

  public async approveChatJoinRequest(request: JoinRequest): Promise<void> {
    this._joinRequestApproved.push(request);
  }

  public async declineChatJoinRequest(request: JoinRequest): Promise<void> {
    this._joinRequestDeclined.push(request);
  }

  // for test purpose
  public get messageSent(): Message[] {
    return this._messageSent;
  }

  public get joinRequestApproved(): JoinRequest[] {
    return this._joinRequestApproved;
  }

  public get joinRequestDeclined(): JoinRequest[] {
    return this._joinRequestDeclined;
  }

  public reset(): void {
    this._messageSent = [];
    this._joinRequestApproved = [];
    this._joinRequestDeclined = [];
  }
}
