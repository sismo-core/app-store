import env from "@/src/environments";
import { GroupProvider } from "../group-provider";
import { KeyValueStore, MemoryKeyValueStore } from "../key-value-store";
import {
  SpaceConfigService,
  LocalSpaceConfigService,
} from "../space-config-service";

export type ClientServicesFactory = {
  groupProvider: GroupProvider;
  keyValueStore: KeyValueStore;
  spaceConfig: SpaceConfigService;
};

let services = null;

export default function getClientServices(): ClientServicesFactory {
  if (services) {
    return services;
  }

  services = {
    groupProvider: new GroupProvider({ hubApiUrl: env.hubApiUrl }),
    keyValueStore: new MemoryKeyValueStore(),
    spaceConfig: new LocalSpaceConfigService(),
  };

  return services;
}
