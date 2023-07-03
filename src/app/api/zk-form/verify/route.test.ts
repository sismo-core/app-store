// /**
//  * @jest-environment node
//  */
// import { POST } from "./route";
// import { MemoryUserStore } from "@/src/libs/user-store/memory-user-store";
// import { getUserStore } from "@/src/libs/user-store";
// import { UserStore } from "@/src/libs/user-store/store";
// import { MockedRequest, mockSpaceType } from "../mocks";
// import { getSpace } from "@/src/libs/spaces";

// describe("POST /api/zk-form/verify", () => {
//   let memoryUserStore: UserStore;

//   beforeEach(() => {
//     jest.resetModules();
//     memoryUserStore = new MemoryUserStore();
//     (getSpace as jest.Mock).mockReturnValue(mockSpaceType());
//     (getUserStore as jest.Mock).mockReturnValue(memoryUserStore);
//   });

//   afterAll(() => {
//     globalThis.curve_bn128.terminate();
//   });

//   it("Should return error when app is not found", async () => {
//     const response = await POST(
//       new MockedRequest({
//         spaceSlug: "spaceSlug",
//         appSlug: "non-existent-app",
//       }) as any
//     );
//     const data = await response.json();
//     expect(data.status).toEqual("error");
//     expect(data.message).toMatch(/Failed to find app/);
//   });

//   // it("Should return error when proof is invalid", async () => {
//   //   const response = await POST(
//   //     new MockedRequest({
//   //       spaceSlug: "spaceSlug",
//   //       appSlug: "appSlug",
//   //     }) as any
//   //   );
//   //   const data = await response.json();
//   //   expect(data.status).toEqual("error");
//   //   expect(data.message).toMatch(/Failed to verify ZK-Proof/);
//   // });

//   // it("Should return approved when the user is not in the whitelist yet", async () => {
//   //   const response = await POST(
//   //     new MockedRequest({
//   //       spaceSlug: "spaceSlug",
//   //       appSlug: "appSlug",
//   //       response: mockResponse,
//   //     }) as any
//   //   );
//   //   const data = await response.json();
//   //   expect(data.status).toEqual("approved");
//   // });

//   // it("Should return already-approved when the user is already whitelisted", async () => {
//   //   await memoryUserStore.add({
//   //     userId: "6232426394",
//   //     appSlug: "appSlug",
//   //   });
//   //   const response = await POST(
//   //     new MockedRequest({
//   //       spaceSlug: "spaceSlug",
//   //       appSlug: "appSlug",
//   //       response: mockResponse,
//   //     }) as any
//   //   );
//   //   const data = await response.json();
//   //   expect(data.status).toEqual("already-approved");
//   // });
// });
