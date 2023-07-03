import { UserStore } from "../store";
import { User } from "../user";

export class MemoryUserStore extends UserStore {
  private _users: User[] = [];

  public async getUsers(queryUser?: Partial<User>): Promise<User[]> {
    return this._users.filter((user) => {
      if (queryUser?.appSlug && queryUser.appSlug !== user.appSlug)
        return false;
      if (queryUser?.userId && queryUser.userId !== user.userId) return false;
      return true;
    });
  }

  public async add(user: User): Promise<void> {
    this._users.push(user);
  }
}
