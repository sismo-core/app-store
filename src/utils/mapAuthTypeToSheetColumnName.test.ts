import { mapAuthTypeToSheetColumnName } from "./mapAuthTypeToSheetColumnName";
import { AuthType } from "@sismo-core/sismo-connect-server";

describe("mapAuthTypeToSheetColumnName", () => {
  it("maps AuthType.EVM_ACCOUNT to 'Address'", () => {
    const result = mapAuthTypeToSheetColumnName(AuthType.EVM_ACCOUNT);
    expect(result).toEqual("Address");
  });

  it("maps AuthType.TWITTER to 'TwitterId'", () => {
    const result = mapAuthTypeToSheetColumnName(AuthType.TWITTER);
    expect(result).toEqual("TwitterId");
  });

  it("maps AuthType.GITHUB to 'GithubId'", () => {
    const result = mapAuthTypeToSheetColumnName(AuthType.GITHUB);
    expect(result).toEqual("GithubId");
  });

  it("maps AuthType.TELEGRAM to 'TelegramId'", () => {
    const result = mapAuthTypeToSheetColumnName(AuthType.TELEGRAM);
    expect(result).toEqual("TelegramId");
  });

  it("maps AuthType.VAULT to 'VaultId'", () => {
    const result = mapAuthTypeToSheetColumnName(AuthType.VAULT);
    expect(result).toEqual("VaultId");
  });
});