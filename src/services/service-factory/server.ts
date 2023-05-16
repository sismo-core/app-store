import env from "@/src/environments";
import { KeyValueStore, MemoryKeyValueStore } from "../key-value-store";
import {
  SpaceConfigService,
  LocalSpaceConfigService,
} from "../space-config-service";
import { GroupProvider } from "../group-provider";

export type ServerServicesFactory = {
  groupProvider: GroupProvider;
  keyValueStore?: KeyValueStore;
  spaceConfig?: SpaceConfigService;
  //appDataStore: AppDataStore;
};

let services = null;

export default function getServerServices(): ServerServicesFactory {
  if (services) {
    return services;
  }
    services = {
      groupProvider: new GroupProvider({ hubApiUrl: env.hubApiUrl }),
      keyValueStore: new MemoryKeyValueStore(),
      // appDataStore: new DynamoDBKeyValueStore(),
      spaceConfig: new LocalSpaceConfigService(),
    };

  return services;
}


