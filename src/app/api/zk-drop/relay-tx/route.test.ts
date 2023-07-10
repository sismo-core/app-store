/**
 * @jest-environment node
 */
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { POST } from "./route";
import { spaceMock1, spaceMock2 } from "@/src/services/spaces-service/tests/spaces-mock";
import { Network } from "@/src/libs/contracts/networks";


const mockMint = jest.fn().mockImplementation(() => Promise.resolve({ hash: 'mockTxHash' }));

jest.mock("../../../../libs/contracts/signers", () => {
    return {
      getDefenderRelayerSigner: jest.fn().mockReturnValue({}),
    };
});

jest.mock('../../../../libs/contracts/zk-drop', () => {
    const originalModule = jest.requireActual("../../../../libs/contracts/zk-drop");
    return {
        __esModule: true,
        ...originalModule,
        ZkDropContract: jest.fn().mockImplementation(() => {
            return {
                mint: mockMint,
            };
        }),
    };
});

describe('POST /api/zk-drop/relay-tx', () => {
    beforeEach(() => {
      let spacesService = ServiceFactory.getSpacesService();
      const configs = [
          spaceMock1,
          spaceMock2
      ]
      spacesService.updateConfigs(configs);
    })
  
    afterEach(() => {
      let configs = ServiceFactory.getSpaceConfigs();
      let spacesService = ServiceFactory.getSpacesService();
      spacesService.updateConfigs(configs);
      jest.clearAllMocks();
    })

    it('Should throw with an incorrect app slug', async () => {
        const req: any = {
            json: jest.fn().mockResolvedValue({
                responseBytes: 'mockResponseBytes',
                destination: 'mockDestination',
                spaceSlug: spaceMock1.metadata.slug,
                appSlug: "zk-drop-slug-invalid",
                chain: Network.Sepolia
            })
        };

        const response = await POST(req);
        const data = await response.json();
        expect(data.code).toEqual(`No app found for ${spaceMock1.metadata.slug}/zk-drop-slug-invalid`);
    });

    it('Should throw with an incorrect chain', async () => {
        const req: any = {
            json: jest.fn().mockResolvedValue({
                responseBytes: 'mockResponseBytes',
                destination: 'mockDestination',
                spaceSlug: spaceMock1.metadata.slug,
                appSlug: "zk-drop-slug",
                chain: Network.Mumbai
            })
        };

        const response = await POST(req);
        const data = await response.json();
        expect(data.code).toEqual(`Chain mumbai not supported for the app ${spaceMock1.metadata.slug}/zk-drop-slug`);
    });

    it('Should call mint with the correct arguments', async () => {
        const req: any = {
            json: jest.fn().mockResolvedValue({
                responseBytes: 'mockResponseBytes',
                destination: 'mockDestination',
                spaceSlug: spaceMock1.metadata.slug,
                appSlug: "zk-drop-slug",
                chain: Network.Sepolia
            })
        };
        await POST(req);
        console.log("Mock mint calls: ", mockMint.mock.calls);
        expect(mockMint).toHaveBeenCalledWith({
            responseBytes: 'mockResponseBytes',
            address: 'mockDestination'
        });
    });
});