import {
  ZkAppType,
  AppCommonType,
  ExternalAppType,
  SpaceType,
  ZkFormAppType,
  ZkTelegramBotAppType,
  ZkBadgeAppType,
} from "./types";
import { AuthType } from "@sismo-core/sismo-connect-server";
import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import { SpaceConfig } from "@/space-configs/types";

export type GetAppsOptions = {
  sortedBy?: "createdAt";
  where?: {
    spaceSlug?: string;
    appSlug?: string;
  };
};

export type GetSpacesOptions = {
  where?: {
    spaceSlug?: string;
  };
};

export class SpacesService {
  private _spaceConfigs: SpaceConfig[];

  constructor({ spaceConfigs }: { spaceConfigs: SpaceConfig[] }) {
    this._spaceConfigs = spaceConfigs;
  }

  public async getSpaces(options?: GetSpacesOptions): Promise<SpaceType[]> {
    let spaces = await this._getAllSpaces();

    if (options?.where?.spaceSlug) {
      spaces = spaces.filter((space) => {
        return space.slug === options?.where?.spaceSlug;
      });
    }

    return spaces;
  }

  public async getApps(options?: GetAppsOptions) {
    let apps = await this._getAllApps();

    if (options?.sortedBy === "createdAt") {
      apps.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }

    if (options?.where?.appSlug) {
      apps = apps.filter((app) => app.slug === options?.where?.appSlug);
    }

    if (options?.where?.spaceSlug) {
      apps = apps.filter((app) => app.space.slug === options?.where?.spaceSlug);
    }

    return apps;
  }

  public async updateConfig(spaceConfigs: SpaceConfig[]) {
    this._spaceConfigs = spaceConfigs;
  }

  private async _getAllSpaces() {
    let spaces: SpaceType[] = [];
    for (let spaceConfig of this._spaceConfigs) {
      let apps: ZkAppType[] = [];
      const spaceProfileImage = await getImgSrcFromConfig({
        configSlug: spaceConfig.metadata.slug,
        fileName: spaceConfig.metadata.image,
      });
      for (let appConfig of spaceConfig.apps) {
        const appImage = await getImgSrcFromConfig({
          configSlug: spaceConfig.metadata.slug,
          fileName: appConfig.metadata.image,
        });
        const appCommon: AppCommonType = {
          name: appConfig.metadata.name,
          slug: appConfig.metadata.slug,
          description: appConfig.metadata.description,
          image: appImage,
          imageFilename: appConfig.metadata.image,
          tags: appConfig.metadata.tags,
          claimRequests: appConfig.sismoConnectRequest.claimRequests,
          authRequests: appConfig.sismoConnectRequest.authRequests,
          impersonateAddresses: appConfig.sismoConnectRequest.impersonateAddresses,
          appId: appConfig.sismoConnectRequest.appId,
          startDate: new Date(appConfig.options?.startDate),
          endDate: new Date(appConfig.options?.endDate),
          disabled: appConfig.options?.disabled,
          createdAt: new Date(appConfig.metadata.createdAt),
          lastUpdateAt: new Date(appConfig.metadata?.lastUpdateAt),
          isFeatured: appConfig.options?.isFeatured,
          space: {
            slug: spaceConfig.metadata.slug,
            name: spaceConfig.metadata.name,
            profileImage: spaceProfileImage,
          },
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
              step1CtaText: appConfig.templateConfig.step1CtaText ?? "Sign in with Sismo",
              step2CtaText: appConfig.templateConfig.step2CtaText,
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
              step1CtaText: appConfig.templateConfig.step1CtaText ?? "Sign in with Sismo",
              step2CtaText: appConfig.templateConfig.step2CtaText,
              appDescription: appConfig.templateConfig.appDescription,
              telegramGroupId: appConfig.templateConfig.telegramGroupId,
              telegramInviteLink: appConfig.templateConfig.telegramInviteLink,
            } as ZkTelegramBotAppType);
            break;
          case "zkBadge":
            const chains = appConfig.templateConfig.chains.map((chain) => {
              return {
                name: chain.name,
                relayerEnabled: chain.relayerEnabled,
              };
            });
            apps.push({
              type: appConfig.type,
              ...appCommon,
              step1CtaText: appConfig.templateConfig.step1CtaText ?? "Sign in with Sismo",
              step2CtaText: appConfig.templateConfig.step2CtaText,
              appDescription: appConfig.templateConfig.appDescription,
              tokenId: appConfig.templateConfig.tokenId,
              badgeMetadata: {
                name: appConfig.templateConfig.badgeMetadata.name,
                description: appConfig.templateConfig.badgeMetadata.description,
                image: appConfig.templateConfig.badgeMetadata.image,
              },
              chains,
            } as ZkBadgeAppType);
            break;
        }
      }
      const space: SpaceType = {
        name: spaceConfig.metadata.name,
        slug: spaceConfig.metadata.slug,
        description: spaceConfig.metadata.description,
        profileImage: spaceProfileImage,
        socialLinks: spaceConfig.metadata.socialLinks,
        hidden: spaceConfig.options?.hidden,
        apps: apps,
      };
      spaces.push(space);
    }

    return spaces;
  }

  private async _getAllApps(): Promise<ZkAppType[]> {
    const spaces = await this._getAllSpaces();
    let apps: ZkAppType[] = [];

    for (const space of spaces) {
      for (const app of space.apps) {
        apps.push(app);
      }
    }

    return apps;
  }
}
