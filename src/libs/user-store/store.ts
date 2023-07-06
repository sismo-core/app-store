import { User } from "./user";

export abstract class UserStore {
  public abstract getUsers(queryUser: Partial<User>): Promise<User[]>;
  public abstract exists(user: User): Promise<boolean>;
  public abstract add(user: User): Promise<void>;
}
