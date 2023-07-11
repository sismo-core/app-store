/**
 * @jest-environment node
 */
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { GET } from "../../image/[tokenId]/route";
import { spaceMock1, spaceMock2 } from "@/src/services/spaces-service/tests/spaces-mock";
import fs from 'fs';
import path from 'path';


describe('GET /api/zk-badge/image/[tokenId]', () => {

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

  it('should return an error response if no badge is found', async () => {
    const params = { tokenId: "1234" };
    const response = await GET(null, { params });
    const data = await response.json();
    expect(data).toEqual({ error: 'No badge found for tokenId: 1234' });
  });

  it('should return an error response if no badge image is found', async () => {
    const params = { tokenId: "40000001" };
    const response = await GET(null, { params });
    const data = await response.json();
    expect(data).toEqual({ error: 'No badge image found for tokenId: 40000001' });
  });

  it('should return an image response if a badge is found', async () => {
    jest.spyOn(fs, 'readFileSync');

    const params = { tokenId: "40000001" };
    const dummyImageBuffer = Buffer.from([0, 1, 2, 3, 4, 5]); 
    const imagePath = path.join(process.cwd(), '/space-configs/images/image.png'); 
  
    (fs.readFileSync as jest.Mock).mockImplementation((path) => {
        if (path === imagePath) {
        return dummyImageBuffer;
        }
    });

    const response = await GET(null, { params });

    const reader = response.body.getReader();
    const result = await reader.read();
    
    const data = Buffer.from(result.value);
  
    expect(Buffer.compare(data, dummyImageBuffer)).toEqual(0);
    expect(response.status).toEqual(200);
    expect(response.headers.get('Content-Type')).toEqual('image/jpeg');
  });
});