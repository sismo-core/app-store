import { UserStore } from "../store";
import { User } from "../user";

export class MemoryUserStore extends UserStore {
  private _users: User[] = [];

  public async getUsers(queryUser?: Partial<User>): Promise<User[]> {
    return this._users.filter((user) => {
      return queryUser?.userId === user.userId;
    });
  }

  public async add(user: User): Promise<void> {
    this._users.push(user);
  }
}
