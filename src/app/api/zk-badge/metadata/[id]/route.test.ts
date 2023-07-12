/**
 * @jest-environment node
 */
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { decodeCollectionId } from "@/src/utils/collectionId";
import { spaceMock1, spaceMock2 } from "@/src/services/spaces-service/tests/spaces-mock";
import { GET } from "./route";

describe("GET /api/zk-badge/metadata/[i]", () => {
  beforeEach(() => {
    let spacesService = ServiceFactory.getSpacesService();
    const configs = [spaceMock1, spaceMock2];
    spacesService.updateConfigs(configs);
  });

  afterEach(() => {
    let configs = ServiceFactory.getSpaceConfigs();
    let spacesService = ServiceFactory.getSpacesService();
    spacesService.updateConfigs(configs);
  });

  it("should return an error response if no badge is found", async () => {
    const req = new Request("https://example.com");
    const id = decodeCollectionId("1234");
    const params = { id: id + ".json" };
    const response = await GET(req, { params });
    const data = await response.json();
    expect(data).toEqual({ error: "No badge found for id: 1234" });
  });

  it("should return a badge if found", async () => {
    const req = new Request("https://example.com");
    const id = decodeCollectionId("40000001");
    const params = { id: id.toString() };

    const response = await GET(req, { params });
    const data = await response.json();
    expect(data).toEqual({
      name: "Badge name",
      description: "Badge description",
      image: `https://example.com/api/zk-badge/image/40000001`,
    });
  });
});
