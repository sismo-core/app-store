/**
 * @jest-environment node
 */

import ServiceFactory from "@/src/services/service-factory/service-factory";
import { SpacesService } from "@/src/services/spaces-service";
import { spaceMock1 } from "@/src/services/spaces-service/tests/spaces-mock";
import { uploadMetadata } from "./upload-metadata";

describe("SCRIPT upload-metadata", () => {
  let spaceService: SpacesService;

  beforeEach(async () => {
    spaceService = await ServiceFactory.getSpacesService();
    spaceService.updateConfigs([spaceMock1])
  });

  it("should upload ", async () => {
    const spaces = ["space"];
    // const res = await uploadMetadata(spaces, "main");
    // console.log("res", res);
  });
});
