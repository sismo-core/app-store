import { MemoryUserStore } from ".";
import { UserStore } from "../store";

let userStore: UserStore;

const user1 = {
  appSlug: "appSlug1",
  userId: "userId1",
};
const user2 = {
  appSlug: "appSlug2",
  userId: "userId2",
};
const user3 = {
  appSlug: "appSlug1",
  userId: "userId3"
};

describe("MemoryUserStore", () => {
  beforeEach(async () => {
    userStore = new MemoryUserStore();

    await userStore.add(user1);
    await userStore.add(user2);
    await userStore.add(user3);
  });

  it("Should return all users when query is missing", async () => {
    const users = await userStore.getUsers();
    expect(users.length).toEqual(3);
    expect(users[0]).toEqual(user1);
    expect(users[1]).toEqual(user2);
    expect(users[2]).toEqual(user3);
  });

  it("Should return all users matching partial query", async () => {
    const users = await userStore.getUsers({ appSlug: "appSlug1"});
    expect(users.length).toEqual(2);
    expect(users[0]).toEqual(user1);
    expect(users[1]).toEqual(user3);
  });

  it("Should return users matching full query", async () => {
    const users = await userStore.getUsers({ appSlug: "appSlug1", userId: "userId1"});
    expect(users.length).toEqual(1);
    expect(users[0]).toEqual(user1);
  });
});