import {
  SismoConnectApp,
  SismoConnectAppInput,
  SismoFactoryService,
} from "@/src/services/sismo-factory-service/sismo-factory";

export class SismoFactoryMemoryService extends SismoFactoryService {
  private _apps: { [appId: string]: SismoConnectApp } = {};

  protected async _create(app: SismoConnectAppInput): Promise<SismoConnectApp> {
    const appId = `0x${(Object.keys(this._apps).length + 1).toString().padStart(40, "0")}`;
    const newApp: SismoConnectApp = {
      ...app,
      id: appId,
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      logoUrl: "",
    };
    this._apps[appId] = newApp;
    return newApp;
  }

  protected async _update(appId: string, app: SismoConnectApp): Promise<SismoConnectApp> {
    const existingApp = this._apps[appId];
    if (!existingApp) throw new Error("App not found");
    this._apps[app.id] = app;
    return this._apps[app.id];
  }

  async getApps(): Promise<SismoConnectApp[]> {
    return Object.values(this._apps);
  }
}
