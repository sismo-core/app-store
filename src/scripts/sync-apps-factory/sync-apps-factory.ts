import { ZkAppType, getSpaces } from "@/src/libs/spaces";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import fs from "fs";

const APP_REPLACE_PATTERN = /appId: "{{ auto-fill }}"/;

export const syncAppsFactory = async (directoryLocation: string, save: boolean = false) => {
  const sismoFactory = ServiceFactory.getSismoFactoryService();
  const loggerService = ServiceFactory.getLoggerService();
  const spaces = await getSpaces();
  let updatedFiles: {
    filename: string;
    content: string;
  }[] = [];
  for (const space of spaces) {
    const apps: ZkAppType[] = space.apps;
    const filename = `${directoryLocation}/${space.slug}.ts`;
    let spaceFileContent = fs.readFileSync(filename, "utf8");
    let fileNeedsUpdate = false;
    for (const app of apps) {
      const appIdToFill = app.appId.includes("{{ auto-fill }}");
      if (appIdToFill) {
        const imageContent = fs.readFileSync(
          `${__dirname}/../../../space-configs/images/${app.imageFilename}`
        );
        const imageBase64 = Buffer.from(imageContent).toString("base64");

        loggerService.info(`Creating app ${app.name}...`);
        const createdApp = await sismoFactory.createApp({
          name: app.name,
          description: app.description,
          logoBase64: imageBase64,
        });
        loggerService.info(`App ${app.name} created in the factory with id ${createdApp.id}`);

        const createdAppIdString = `appId: "${createdApp.id}"`;
        spaceFileContent = spaceFileContent.replace(APP_REPLACE_PATTERN, createdAppIdString);
        fileNeedsUpdate = true;
      }
    }
    if (save && fileNeedsUpdate) {
      loggerService.info(`Saving file ${filename}`);
      fs.writeFileSync(filename, spaceFileContent);
    }
    updatedFiles.push({ filename, content: spaceFileContent });
  }
  return updatedFiles;
};

// syncAppsFactory();
