import { AuthType } from "@sismo-core/sismo-connect-server";

export const mapAuthTypeToSheetColumnName = (authType: AuthType): string => {
  if (authType === AuthType.EVM_ACCOUNT) {
    return "Address";
  }
  if (authType === AuthType.TWITTER) {
    return "TwitterId";
  }
  if (authType === AuthType.GITHUB) {
    return "GithubId";
  }
  if (authType === AuthType.TELEGRAM) {
    return "TelegramId";
  }
  if (authType === AuthType.VAULT) {
    return "VaultId";
  }
}