import { LoggerService } from "@/src/services/logger-service/logger-service";

export type TelegramBotServiceConstructor = {
  telegramBotToken: string;
  loggerService: LoggerService;
};

export type JoinRequest = {
  groupId: string;
  groupTitle: string;
  userId: string;
  username: string;
};

export type Message = {
  messageId: string;
  groupId: string;
  text: string;
};
