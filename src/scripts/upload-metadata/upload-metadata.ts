import { ZkAppType } from "@/src/services/spaces-service";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { pinFileToIPFS, pinJSONToIPFS } from "./utils/pin-ipfs";

export const uploadMetadata = async (spacesSlugs: string[], env: "demo" | "main" = "main") => {
  const sismoFactory = ServiceFactory.getSismoFactoryService();
  const loggerService = ServiceFactory.getLoggerService();
  const spacesService = ServiceFactory.getSpacesService();

  let uploadedHash: {
    [spaceSlug: string]: {
      [appSlug: string]: string
    }
  } = {};

  for (const space of await spacesService.getSpaces()) {
    if (!spacesSlugs.includes(space.slug)) continue;
    const apps: ZkAppType[] = space.apps;
    for (const app of apps) {
      if (app.type !== "zkDrop") continue;

      // Upload image on IPFS
      const imagePath = `/images/${app.nftMetadata.image}`;
      loggerService.info(`Pinning ${imagePath}...`);
      const { ipfsHash: imageIpfsHash } = await pinFileToIPFS(imagePath);

      // Upload Metadata on IPFS
      const metadata = {
        name: app.nftMetadata.name,
        description: app.nftMetadata.description,
        image: imageIpfsHash
      }
      loggerService.info(`Pinning ${metadata}...`);
      const { ipfsHash: metadataIpfsHash } = await pinJSONToIPFS(metadata);
      uploadedHash[space.slug][app.slug] = metadataIpfsHash;
    }
  }

  return uploadedHash;
};


