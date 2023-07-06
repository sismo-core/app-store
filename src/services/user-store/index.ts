import { PostgresUserStore } from "./postgres-user-store";
export * from "./user";

export const getUserStore = () => {
  return new PostgresUserStore();
};
