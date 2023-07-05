import ServiceFactory from "@/src/libs/service-factory/service-factory";
import {
  ZkAppType,
  AppCommonType,
  ExternalAppType,
  SpaceType,
  ZkFormAppType,
  ZkTelegramBotAppType,
  ZkCustomAppType,
} from "./types";
import { AuthType } from "@sismo-core/sismo-connect-server";

export function getSpaces(): SpaceType[] {
  let spaces: SpaceType[] = [];
  for (let spaceConfig of ServiceFactory.getSpaceConfigs()) {
    let apps: ZkAppType[] = [];
    for (let appConfig of spaceConfig.apps) {
      const appCommon: AppCommonType = {
        name: appConfig.metadata.name,
        slug: appConfig.metadata.slug,
        description: appConfig.metadata.description,
        image: appConfig.metadata.image,
        tags: appConfig.metadata.tags,
        claimRequests: appConfig.sismoConnectRequest.claimRequests,
        authRequests: appConfig.sismoConnectRequest.authRequests,
        impersonateAddresses: appConfig.sismoConnectRequest.impersonateAddresses,
        appId: appConfig.sismoConnectRequest.appId,
        startDate: appConfig.options?.startDate,
        endDate: appConfig.options?.endDate,
        disabled: appConfig.options?.disabled,
        createdAt: appConfig.metadata.createdAt,
        lastUpdateAt: appConfig.metadata?.lastUpdateAt,
        isFeatured: appConfig.options?.isFeatured,
      };
      switch (appConfig.type) {
        case "external":
          apps.push({
            type: appConfig.type,
            ...appCommon,
            link: appConfig.templateConfig.link,
          } as ExternalAppType);
          break;
        case "zkForm": 
          apps.push({
            type: appConfig.type,
            ...appCommon,
            fields: appConfig.templateConfig.fields,
            saveClaims: appConfig.templateConfig.output.saveClaims,
            saveAuths: appConfig.templateConfig.output.saveAuths,
            congratulationsMessage: appConfig.templateConfig.congratulationsMessage,
            failedMessage: appConfig.templateConfig.failedMessage,
            userSelection: appConfig.templateConfig.userSelection,
            output: appConfig.templateConfig.output.destination.type,
            spreadsheetId: appConfig.templateConfig.output.destination.spreadsheetId,
            ctaText: appConfig.templateConfig.step2CtaText,
            appDescription: appConfig.templateConfig.appDescription,
          } as ZkFormAppType);
          break;
        case "zkTelegramBot":
          apps.push({
            type: appConfig.type,
            ...appCommon,
            authRequests: appConfig.sismoConnectRequest.authRequests ?? [
              { authType: AuthType.TELEGRAM },
            ],
            ctaText: appConfig.templateConfig.step2CtaText,
            appDescription: appConfig.templateConfig.appDescription,
            telegramGroupId: appConfig.templateConfig.telegramGroupId,
            telegramInviteLink: appConfig.templateConfig.telegramInviteLink,
          } as ZkTelegramBotAppType);
          break;
        case "zkCustom":
          apps.push({
            type: appConfig.type,
            ...appCommon,
            authRequests: appConfig.sismoConnectRequest.authRequests ?? [
              { authType: AuthType.VAULT },
            ],
            extraData: appConfig.templateConfig.extraData,
          } as ZkCustomAppType);
          break;
      }
    }
    const space: SpaceType = {
      name: spaceConfig.metadata.name,
      slug: spaceConfig.metadata.slug,
      description: spaceConfig.metadata.description,
      profileImage: spaceConfig.metadata.image,
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

export function getApp({
  appSlug,
  spaceSlug,
}: { appSlug?: string; spaceSlug?: string } = {}): ZkAppType {
  const spaces = getSpaces();
  const selectedSpace = spaces.find((space) => {
    return space.slug === spaceSlug;
  });
  const selectedApp = selectedSpace?.apps.find((app) => {
    return app.slug === appSlug;
  });
  return selectedApp;
}
