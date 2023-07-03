import { configsDemo, configsMain } from "@/space-config";
import { SpaceConfig } from "@/space-config/types";
import { mockTelegramTestSpaceType } from "@/src/app/api/zk-telegram-bot/mocks";
import env from "@/src/environments";
import { DemoUserStore } from "@/src/libs/user-store/demo-user-store";
import { MemoryUserStore } from "@/src/libs/user-store/memory-user-store";
import { PostgresUserStore } from "@/src/libs/user-store/postgres-user-store";
import { UserStore } from "@/src/libs/user-store/store";

let configService: SpaceConfig[];
let zkTelegramBotUserStore: UserStore;

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
      if (env.isMain) {
        zkTelegramBotUserStore = new PostgresUserStore();
      } else if (env.isDemo) {
        zkTelegramBotUserStore = new DemoUserStore();
      } else if (env.isTest) {
        zkTelegramBotUserStore = new MemoryUserStore();
      }
    }
    return zkTelegramBotUserStore;
  },
};

export default ServiceFactory;
