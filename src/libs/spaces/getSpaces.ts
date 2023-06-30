import { spacesConfig } from "@/space-config";
import {
  ZkAppType,
  AppCommonType,
  ExternalAppType,
  SpaceType,
  ZkFormAppType,
  ZkTelegramBotAppType,
} from "./types";

export function getSpaces(): SpaceType[] {
  let spaces: SpaceType[] = [];
  for (let spaceConfig of spacesConfig) {
    let apps: ZkAppType[] = [];
    for (let appConfig of spaceConfig.apps) {
      const appCommon: AppCommonType = {
        name: appConfig.metadata.name,
        slug: appConfig.metadata.slug,
        description: appConfig.metadata.description,
        image: appConfig.metadata.image,
        tags: appConfig.metadata.tags,
        ctaText: appConfig.metadata.ctaText,
        claimRequests: appConfig.sismoConnectRequest.claimRequests,
        authRequests: appConfig.sismoConnectRequest.authRequests,
        impersonateAddresses: appConfig.sismoConnectRequest.impersonateAddresses,
        startDate: appConfig.options?.startDate,
        endDate: appConfig.options?.endDate,
        disabled: appConfig.options?.disabled,
      };
      if (appConfig.type === "external") {
        apps.push({
          type: appConfig.type,
          ...appCommon,
        } as ExternalAppType);
      } else if (appConfig.type === "zk-form") {
        apps.push({
          type: appConfig.type,
          ...appCommon,
        } as ZkFormAppType);
      } else if (appConfig.type === "zkTelegramBot") {
        apps.push({
          type: appConfig.type,
          ...appCommon,
        } as ZkTelegramBotAppType);
      }
    }
    const space: SpaceType = {
      name: spaceConfig.metadata.name,
      slug: spaceConfig.metadata.slug,
      description: spaceConfig.metadata.description,
      profileImage: spaceConfig.metadata.profileImage,
      coverImage: spaceConfig.metadata.coverImage,
      socialLinks: spaceConfig.metadata.socialLinks,
      hidden: spaceConfig.options?.hidden,
      apps: apps,
    };
    spaces.push(space);
  }
  return spaces;
}

export function getSpace({ slug }: { slug?: string } = {}): SpaceType {
  const spaces = getSpaces();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}
