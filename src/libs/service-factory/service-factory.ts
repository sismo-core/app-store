import { configsDemo, configsMain } from "@/space-config";
import { SpaceConfig } from "@/space-config/types";
import { mockTelegramTestSpaceType } from "@/src/app/api/zk-telegram-bot/mocks";
import env from "@/src/environments";
import { LoggerService } from "@/src/libs/logger-service/logger-service";
import { MemoryLogger } from "@/src/libs/logger-service/memory-logger-service";
import { StdoutLogger } from "@/src/libs/logger-service/stdout-logger-service";
import { MockedTelegramBotService } from "@/src/libs/telegram-bot-service/mocked-telegram-bot-service";
import {
  TelegramAPIBotService,
  TelegramBotInterface,
} from "@/src/libs/telegram-bot-service/telegram-bot-service";
import { DemoUserStore } from "@/src/libs/user-store/demo-user-store";
import { MemoryUserStore } from "@/src/libs/user-store/memory-user-store";
import { PostgresUserStore } from "@/src/libs/user-store/postgres-user-store";
import { UserStore } from "@/src/libs/user-store/store";

let configService: SpaceConfig[];
let zkTelegramBotUserStore: UserStore;
let telegramBotService: TelegramBotInterface;
let loggerService: LoggerService;

const ServiceFactory = {
  getSpaceConfigs: (customConfigService?: SpaceConfig[]): SpaceConfig[] => {
    if (customConfigService) {
      configService = customConfigService;
    }
    if (!configService) {
      if (env.isDemo) {
        configService = configsDemo;
      } else if (env.isMain) {
        configService = configsMain;
      } else if (env.isTest) {
        configService = [mockTelegramTestSpaceType()];
      }
    }
    return configService;
  },
  getZkTelegramBotUserStore: (customUserStore?: UserStore): UserStore => {
    if (customUserStore) {
      zkTelegramBotUserStore = customUserStore;
    }
    if (!zkTelegramBotUserStore) {
      if (env.isTest) {
        zkTelegramBotUserStore = new MemoryUserStore();
      } else if (env.isMain) {
        zkTelegramBotUserStore = new PostgresUserStore();
      } else if (env.isDemo) {
        zkTelegramBotUserStore = new DemoUserStore();
      }
    }
    return zkTelegramBotUserStore;
  },
  getLoggerService: (): LoggerService => {
    if (!loggerService) {
      if (env.isTest) {
        loggerService = new MemoryLogger();
      } else {
        loggerService = new StdoutLogger();
      }
    }
    return loggerService;
  },
  getTelegramBotService: (): TelegramBotInterface => {
    if (!telegramBotService) {
      if (env.isTest) {
        telegramBotService = new MockedTelegramBotService();
      } else {
        telegramBotService = new TelegramAPIBotService({
          telegramBotToken: env.telegramBotToken,
          loggerService: ServiceFactory.getLoggerService(),
        });
      }
    }
    return telegramBotService;
  },
  reset: (): void => {
    configService = null;
    zkTelegramBotUserStore = null;
    telegramBotService = null;
    loggerService = null;
  },
};

export default ServiceFactory;