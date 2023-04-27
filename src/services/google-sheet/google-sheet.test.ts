import { GoogleSheet } from "./google-sheet";
// export type UserType = {
//   id: string;
//   name: string;
//   firstname: string;
//   email: string;
//   twitterId: string;
//   githubId: string;
//   createdAt: string;
// };

describe("NativeGoogleUserStore", () => {
  const googleSheet = new GoogleSheet();

  it("should return the spreadsheetId", async () => {
    expect(await googleSheet.getSpreadsheetIdFromRoot("aave")).toEqual("123456")
  })

  it("should create a new spreadsheet", async () => {
  //  await googleSheet.createNewSpreadsheet("aave2")
  })

  //let mockGet : jest.SpyInstance;

  // beforeEach(() => {
  //   const mockGetResult = {
  //     data: {
  //       values: [
  //         [
  //           "User_id",
  //           "Name",
  //           "Firstname",
  //           "Email",
  //           "Twitter_id",
  //           "Github_id",
  //           "Created_at",
  //         ],
  //         [
  //           "123",
  //           "John Doe",
  //           "John",
  //           "johndoe@example.com",
  //           "@johndoe",
  //           "johndoe",
  //           "2022-01-01",
  //         ],
  //       ],
  //     },
  //   };

  //   mockGet = jest
  //     .spyOn(userStore["service"].spreadsheets.values, "get")
  //     .mockResolvedValue(mockGetResult as never);
  // });

  // afterEach(() => {
  //   jest.resetAllMocks();
  // });

  // it("should get a user by id", async () => {
  //   const id = "123";

  //   const expectedUser: UserType = {
  //     id,
  //     name: "John Doe",
  //     firstname: "John",
  //     email: "johndoe@example.com",
  //     twitterId: "@johndoe",
  //     githubId: "johndoe",
  //     createdAt: "2022-01-01",
  //   };

  //   const actualUser = await userStore.getUser(id);

  //   expect(mockGet).toHaveBeenCalled();
  //   expect(actualUser).toEqual(expectedUser);
  // });

  // it("should return null if user is not found", async () => {
  //   const id = "456";

  //   const actualUser = await userStore.getUser(id);
  //   expect(mockGet).toHaveBeenCalled();
  //   expect(actualUser).toEqual(null);
  // });

  // it("should add a new user", async () => {
  //   const newUser: UserType = {
  //     id: "789",
  //     name: "Jane Doe",
  //     firstname: "Jane",
  //     email: "janedoe@example.com",
  //     twitterId: "@janedoe",
  //     githubId: "janedoe",
  //     createdAt: "2022-01-01",
  //   };

  //   const mockGetResult = {
  //     data: {
  //       updates: {
  //         updatedData: {
  //           values: [
  //             [
  //               newUser.id,
  //               newUser.name,
  //               newUser.firstname,
  //               newUser.email,
  //               newUser.twitterId,
  //               newUser.githubId,
  //               newUser.createdAt,
  //             ],
  //           ],
  //         },
  //       },
  //     },
  //     statusText: "OK",
  //   };

  //   const mockAppend = jest
  //     .spyOn(userStore["service"].spreadsheets.values, "append")
  //     .mockResolvedValueOnce(mockGetResult as never);

  //   const actualUser = await userStore.addUser(newUser);

  //   expect(mockGet).toHaveBeenCalled()
  //   expect(mockAppend).toHaveBeenCalled();
  //   expect(actualUser).toEqual(newUser);
  // });

  // it("should return null if user already exists", async () => {
  //   const newUser: UserType = {
  //     id: "123",
  //     name: "Jane Doe",
  //     firstname: "Jane",
  //     email: "janedoe@example.com",
  //     twitterId: "@janedoe",
  //     githubId: "janedoe",
  //     createdAt: "2022-01-01",
  //   };

  //   const mockGetResult = {
  //     data: {
  //       updates: {
  //         updatedData: {
  //           values: [
  //             [
  //               newUser.id,
  //               newUser.name,
  //               newUser.firstname,
  //               newUser.email,
  //               newUser.twitterId,
  //               newUser.githubId,
  //               newUser.createdAt,
  //             ],
  //           ],
  //         },
  //       },
  //     },
  //     statusText: "OK",
  //   };

  //   const mockAppend = jest
  //     .spyOn(userStore["service"].spreadsheets.values, "append")
  //     .mockResolvedValueOnce(mockGetResult as never);

  //   const actualUser = await userStore.addUser(newUser);
    
  //   expect(mockGet).toHaveBeenCalled()
  //   expect(mockAppend).not.toHaveBeenCalled();
  //   expect(actualUser).toEqual(null);
  // });
});
