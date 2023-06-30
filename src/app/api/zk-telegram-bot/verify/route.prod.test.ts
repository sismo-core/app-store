/**
 * @jest-environment node
 */
import { POST } from "./route";
import { MemoryUserStore } from "@/src/libs/user-store/memory-user-store";
import { getUserStore } from "@/src/libs/user-store";
import { UserStore } from "@/src/libs/user-store/store";
import { MockedRequest, mockSpaceType } from "../mocks";
import { getSpace } from "@/src/libs/spaces";

jest.mock("../../../../libs/user-store", () => ({
  getUserStore: jest.fn(),
}));

jest.mock("../../../../environments", () => ({
  isDemo: false,
  isDev: true,
}));

jest.mock("../../../../libs/spaces", () => {
  return {
    getSpace: jest.fn(),
  };
});

describe("POST /api/zk-telegram-bot/verify", () => {
  let memoryUserStore: UserStore;

  beforeEach(() => {
    console.log("hello");
    jest.resetModules();
    memoryUserStore = new MemoryUserStore();
    (getSpace as jest.Mock).mockReturnValue(mockSpaceType());
    (getUserStore as jest.Mock).mockReturnValue(memoryUserStore);
  });

  afterAll(() => {
    globalThis.curve_bn128.terminate();
  });

  it("Should return error when app is not found", async () => {
    const response = await POST(
      new MockedRequest({
        spaceSlug: "spaceSlug",
        appSlug: "non-existent-app",
      }) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch(/Failed to find app/);
  });

  it("Should return error when proof is invalid", async () => {
    const response = await POST(
      new MockedRequest({
        spaceSlug: "spaceSlug",
        appSlug: "appSlug",
      }) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch(/Failed to verify ZK-Proof/);
  });

  it("Should return approved when the user is not in the whitelist yet", async () => {
    const response = await POST(
      new MockedRequest({
        spaceSlug: "spaceSlug",
        appSlug: "appSlug",
        response: mockResponse,
      }) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("approved");
  });

  it("Should return already-approved when the user is already whitelisted", async () => {
    await memoryUserStore.add({
      userId: "6232426394",
      appSlug: "appSlug",
    });
    const response = await POST(
      new MockedRequest({
        spaceSlug: "spaceSlug",
        appSlug: "appSlug",
        response: mockResponse,
      }) as any
    );
    const data = await response.json();
    expect(data.status).toEqual("already-approved");
  });
});

const mockResponse = {
  appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
  namespace: "main",
  version: "sismo-connect-v1.1",
  proofs: [
    {
      auths: [
        {
          authType: 4,
          userId: "0x1003000000000000000000000000006232426394",
          extraData: "",
          isSelectableByUser: true,
        },
      ],
      proofData:
        "0x1013cffe8548f831e753c2713edf351ef8450629f23515f485322306d68dbcd229bf87f4b208d1861339439117fca3046feb7e9ff7cdd2b1990399979846f95b1461b5f41138a006dfd33a46d1ee36cc99b716a1fb3e24ef2bd2be951e29e2f5015b76630f49eaf19ae229cc91130e95e654c9ae975d0c7a787c0d8d07d998af2ca98610c3bf3b248701eb22088c8651c5c9dbc7a90a3b332c09b427c7564146079f197fbde99cf215855e9099fb17d7f0f29b84fcc01d53f8c11dd40e48d5790e36e83b63e339b522e8085357d4fa5455150a0730c082b52e01337b36900aff25bdffebaebaae9787726cd21ab5e788d1f2249b66cdd0b700f7aa9981ba9e940000000000000000000000001003000000000000000000000000006232426394000000000000000000000000000000000000000000000000000000000000000007f6c5612eb579788478789deccb06cf0eb168e457eea490af754922939ebdb920706798455f90ed993f8dac8075fc1538738a25f0c928da905c0dffd81869fa00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000029f6a8ec2fbcafee0ef1776935c662aa1c223e94983db106046e128d260d21d828c5df3e7720b1d2f6693ebdbba8b0b3866e0a65276bdf16e64a372ce716915100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      extraData: "",
      provingScheme: "hydra-s3.1",
    },
  ],
};
