import { User } from "./user";

export abstract class UserStore {
  public abstract getUsers(queryUser: User): Promise<User[]>;
  public abstract add(user: User): Promise<void>;
}
