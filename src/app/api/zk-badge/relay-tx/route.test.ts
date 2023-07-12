/**
 * @jest-environment node
 */
import { POST } from "./route";

const mockMint = jest.fn().mockImplementation(() => Promise.resolve({ hash: "mockTxHash" }));

jest.mock("../../../../libs/contracts/signers", () => {
  return {
    getDefenderRelayerSigner: jest.fn().mockReturnValue({}),
  };
});

jest.mock("../../../../libs/contracts/zk-badge", () => {
  const originalModule = jest.requireActual("../../../../libs/contracts/zk-badge");
  return {
    __esModule: true,
    ...originalModule,
    ZkBadgeContract: jest.fn().mockImplementation(() => {
      return {
        mint: mockMint,
      };
    }),
  };
});

describe("POST /api/zk-badge/relay-tx", () => {
  it("calls mint with the correct arguments", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue({
        responseBytes: "mockResponseBytes",
        destination: "mockDestination",
        tokenId: "mockTokenId",
      }),
    };
    await POST(req);
    expect(mockMint).toHaveBeenCalledWith({
      responseBytes: "mockResponseBytes",
      address: "mockDestination",
      tokenId: "mockTokenId",
    });
  });
});
