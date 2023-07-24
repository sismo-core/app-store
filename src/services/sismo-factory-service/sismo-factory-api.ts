import {
  SismoConnectApp,
  SismoConnectAppInput,
  SismoFactoryService,
} from "@/src/services/sismo-factory-service/sismo-factory";
import axios from "axios";

export class SismoFactoryAPIService extends SismoFactoryService {
  private _url: string;
  private _token: string;

  constructor({ url, token }: { url: string; token: string }) {
    super();
    this._url = url;
    this._token = token;
  }

  protected async _create(app: SismoConnectAppInput): Promise<SismoConnectApp> {
    const res = await axios.post(
      `${this._url}/apps/create`,
      { appInput: app },
      {
        headers: this._getHeaders(),
      }
    );
    return res.data;
  }

  protected async _update(appId: string, app: SismoConnectApp): Promise<SismoConnectApp> {
    const res = await axios.put(
      `${this._url}/apps/${appId}`,
      { app },
      {
        headers: this._getHeaders(),
      }
    );
    return res.data;
  }

  async getApps(): Promise<SismoConnectApp[]> {
    const res = await axios.get(`${this._url}/apps`, {
      headers: this._getHeaders(),
    });
    return res.data;
  }

  private _getHeaders(): { [key: string]: string } {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this._token}`,
    };
  }
}
