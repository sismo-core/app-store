import { SpaceConfig } from '@/space-config/types';
import getImgSrcFromConfig from '../../utils/getImgSrcFromConfig';
import { spaceMock1, spaceMock2 } from './tests/spaces-mock';
import { GetAppsOptions, GetSpacesOptions, SpacesService } from './spaces-service';

jest.mock('../../utils/getImgSrcFromConfig');
  
describe('SpacesService', () => {
  let service: SpacesService;
  let spaceConfigs: SpaceConfig[];

  beforeEach(() => {
    // Assuming there are two spaceConfigs with certain attributes
    spaceConfigs = [spaceMock1, spaceMock2];
    service = new SpacesService({ spaceConfigs });

    (getImgSrcFromConfig as jest.Mock).mockReturnValue('imageSource');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSpaces', () => {
    it('should return all spaces when no options provided', async () => {
      const spaces = await service.getSpaces();
      expect(spaces.length).toBe(2);
    });

    it('should return filtered spaces when spaceSlug option is provided', async () => {
      const options: GetSpacesOptions = {
        where: {
          spaceSlug: 'space'
        }
      };
      const result = await service.getSpaces(options);
      expect(result.length).toBe(1);
    });
  });

  describe('getApps', () => {
    it('should return all apps when no options provided', async () => {
      const result = await service.getApps();
      expect(result.length).toBe(9);
    });

    it('should return filtered apps when spaceSlug is provide', async () => {
    const options: GetAppsOptions = {
        where: {
            spaceSlug: 'space'
        }
        };
      const result = await service.getApps(options);
      expect(result.length).toBe(5);
    });

    it('should return apps sorted by createdAt when sortedBy option is provided', async () => {
      const options: GetAppsOptions = {
        sortedBy: 'createdAt'
      };
      const apps = await service.getApps(options);

      for (let i = 1; i < apps.length - 1; i++) {
        expect(apps[i - 1].createdAt.getTime()).toBeGreaterThanOrEqual(apps[i].createdAt.getTime());
      }
    });
  });
});