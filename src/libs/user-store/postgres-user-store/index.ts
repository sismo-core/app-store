import { UserStore } from "../store";
import { User } from "../user";
import { UserEntity } from "./Entities/user.entity";
import { initAppDataSource } from "./initAppDataSource";
import { DataSource } from "typeorm";
import "reflect-metadata";

export class PostgresUserStore extends UserStore {
  private appDataSource: DataSource;

  private async init(): Promise<void> {
    if (!this.appDataSource) {
      this.appDataSource = await initAppDataSource();
    }
  }

  public async getUsers(queryUser?: Partial<User>): Promise<User[]> {
    await this.init();

    const userRepository = this.appDataSource.getRepository(UserEntity);
    return await userRepository.find({ where: queryUser });
  }

  public async exists(user: User): Promise<boolean> {
    const users = await this.getUsers(user);
    return users.length > 0;
  }

  public async add(user: User): Promise<void> {
    await this.init();

    const userEntity = new UserEntity();
    userEntity.userId = user.userId;
    userEntity.appSlug = user.appSlug;
    await this.appDataSource.manager.save(userEntity);
  }
}
