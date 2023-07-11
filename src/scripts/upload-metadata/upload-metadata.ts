import { ZkAppType } from "@/src/services/spaces-service";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { pinFileToIPFS, pinJSONToIPFS } from "./utils/pin-ipfs";
import { StdoutLogger } from "@/src/services/logger-service/stdout-logger-service";

export const uploadMetadata = async (spacesSlugs: string[]) => {
  const loggerService = new StdoutLogger();
  const spacesService = ServiceFactory.getSpacesService();

  let uploadedHash: {
    [spaceSlug: string]: {
      [appSlug: string]: string;
    };
  } = {};

  for (const space of await spacesService.getSpaces()) {
    if (!spacesSlugs.includes(space.slug)) continue;
    const apps: ZkAppType[] = space.apps;
    for (const app of apps) {
      if (app.type !== "zkDrop") continue;
      // Upload image on IPFS
      const imagePath = `${__dirname}/../../../space-configs/images/${app.nftMetadata.image}`;
      loggerService.info(`Pinning ${imagePath}...`);
      const { ipfsHash: imageIpfsHash } = await pinFileToIPFS(imagePath);

      // Upload Metadata on IPFS
      const metadata = {
        name: app.nftMetadata.name,
        description: app.nftMetadata.description,
        image: `ipfs://${imageIpfsHash}`,
      };
      loggerService.info(`Pinning ${JSON.stringify(metadata, null, 2)}...`);
      const { ipfsHash: metadataIpfsHash } = await pinJSONToIPFS(metadata);
      uploadedHash[space.slug] = uploadedHash[space.slug] || {};
      uploadedHash[space.slug][app.slug] = metadataIpfsHash;
    }
  }

  return uploadedHash;
};
