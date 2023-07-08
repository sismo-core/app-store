export type SismoConnectBaseApp = {
  name: string;
  description: string;
  logoBase64?: string; // png in BASE64 format
};

export type SismoConnectAppCommon = {
  authorizedDomains: string[];
  creatorId: string;
};

export type SismoConnectAppInput = SismoConnectBaseApp & SismoConnectAppCommon;

export type SismoConnectApp = SismoConnectAppInput & {
  id: string;
  createdAt: number;
  lastUpdatedAt: number;
  logoUrl: string;
  authorizedDomains: string[];
  creatorId?: string;
};

export abstract class SismoFactoryService {
  protected _commonParams: SismoConnectAppCommon = {
    authorizedDomains: ["*.sismo.io", "*sismo.vercel.app"], // vercel is used to test preview deployment
    creatorId: "0x5151110000000000000000000000000000000001", // service account used by the sismo app store
  };

  public createApp(app: SismoConnectBaseApp): Promise<SismoConnectApp> {
    return this._create({
      ...this._commonParams,
      ...app,
    });
  }
  public updateApp(appId: string, app: SismoConnectBaseApp): Promise<SismoConnectApp> {
    return this._update(appId, {
      ...this._commonParams,
      ...app,
    });
  }

  abstract getApps(): Promise<SismoConnectApp[]>;
  protected abstract _create(app: SismoConnectAppInput): Promise<SismoConnectApp>;
  protected abstract _update(appId: string, app: SismoConnectAppInput): Promise<SismoConnectApp>;
}
