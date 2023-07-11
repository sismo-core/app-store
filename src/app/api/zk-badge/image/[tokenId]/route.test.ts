/**
 * @jest-environment node
 */
import { spaceMockWithZkBadge } from "./mocks";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { GET } from "../../image/[tokenId]/route";

describe("GET /api/zk-badge/image/[tokenId]", () => {
  beforeEach(() => {
    ServiceFactory.reset();
    ServiceFactory.getSpaceConfigs([spaceMockWithZkBadge]);
  });

  it("should return an error response if no badge is found", async () => {
    const params = { tokenId: "1234" };
    const response = await GET(null, { params });
    const data = await response.json();
    expect(data).toEqual({ error: "No badge found for tokenId: 1234" });
  });

  it("should return an image response if a badge is found", async () => {
    const params = { tokenId: "40000001" };
    const response = await GET(null, { params });
    expect(response.status).toEqual(200);
    expect(response.headers.get("Content-Type")).toEqual("image/jpeg");
  });

  it("should return an error response if no badge image is found", async () => {
    const params = { tokenId: "40000002" };
    const response = await GET(null, { params });
    const data = await response.json();
    expect(data).toEqual({ error: "No image found for badge tokenId: 40000002" });
  });
});
